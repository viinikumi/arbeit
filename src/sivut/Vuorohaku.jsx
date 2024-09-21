import { useState, useEffect } from "react";
import "../tyyli.css";
import { AgGridReact } from "ag-grid-react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
//import KellonAika from "../components/KellonAika";
import Alasveto from "../components/Alasveto";

import { lista_jsonista } from "../components/funk_vuoro/lista_jsonista";
import { siirtymatListassa } from "../components/funk_vuoro/siirtymatListassa";
import { kartoitaPaivat } from "../components/funk_vuoro/kartoitaPaivat";

const Vuorohaku = () => {
  const [lista, setLista] = useState([]);
  const viikonPaivat = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];
  const [teksti, setTeksti] = useState("");
  const [pikkuLista, setPikkuLista] = useState([]);
  const [paivaLista, setPaivalista] = useState([]);
  const [uusiYhdistetty, setUuusiYhdistetty] = useState([]);
  //const lahto = 35; // !(35)!
  const [kiertonumero, setKiertonumero] = useState("");
  const [lahto, setLahto] = useState("");

  //--------------------------------------------------------
  // kerätään yhteen pötköön:
  useEffect(() => {
    setLista(lista_jsonista());
  }, []);

  //-----------------------------------------------------------
  //
  const kiintoPiste = new Date("2024-6-10"); // !("2024-6-10")!
  kiintoPiste.setUTCHours(0);
  const kp = Number(kiintoPiste.getTime());

  //--------------------------PATKA-------------------------
  const patka = (siirtyma, uusi) => {
    var pl = [];
    var takaisin = [];

    for (var c = -3; c <= 5; c++) {
      takaisin.push(c);
    }
    var uusiUusi = [];

    takaisin.map((ero) => {
      uusiUusi.push(new Date(uusi + ero * 1000 * 60 * 60 * 24));
    });

    var uusin = [];

    kartoitaPaivat(uusiUusi, uusin, viikonPaivat);
    siirtymatListassa(siirtyma, pl, lista);
    setKiertonumero(Math.floor(siirtyma / 21) + 1);

    setPikkuLista([...pl]);
    setPaivalista([...uusin]);
    yhdista([...pl], [...uusin]);
  };

  //------------------------------------------------------

  const yhdista = () => {
    const Yhdistetty = pikkuLista.map((vuoro, index) => {
      return { vuoro: vuoro, paiva: paivaLista[index + 1] };
    });
    setUuusiYhdistetty([...Yhdistetty]);
  };

  useEffect(() => {
    yhdista();
  }, [pikkuLista]);
  //----------------------------------------------------------
  const muutos = (event) => {
    setTeksti(event.target.value);
  };
  //-----------------------------------------------------------

  const haku = () => {
    if (lahto == "eiValittu" || lahto === "") {
      alert("Tekijä ei ole valittu");
      return;
    }

    var tekstiMuuta = teksti.split(".");
    tekstiMuuta = `${tekstiMuuta[2]},${tekstiMuuta[1]},${tekstiMuuta[0]}`;

    var uusi = new Date(tekstiMuuta); //date muotoon
    uusi.setUTCHours(0, 0, 0);
    uusi = uusi.getTime(); //millisekuntteihin

    var ErotusPaivia = (uusi - kp) / (1000 * 60 * 60 * 24); //erotus päivinä aikapisteestä
    var siirtyma = lahto + ErotusPaivia; // (35+erotuspäivät)

    patka(siirtyma, uusi); // vie patkaan
  };
  //--------------------------------------------------------
  const columnDefs = [
    {
      headerName: "Päivä",
      field: "paiva",
      sortable: true,
      filter: true,
      cellStyle: (params) => {
        if (
          params.value &&
          params.value.includes(teksti) &&
          teksti.length > 7
        ) {
          return {
            color: "red",
            fontWeight: "bold",
            fontStyle: "oblique",
            fontSize: "13px",
            borderBottom: "2px solid gray",
            borderTop: "2px solid gray",
            backgroundColor: "lightgrey",
          };
        }
        if (
          (params.value && params.value.startsWith("La")) ||
          (params.value && params.value.startsWith("Su"))
        ) {
          return {
            fontWeight: "bold",
            fontStyle: "oblique",
          };
        }
      },
    },

    {
      headerName: "Vuoro",
      field: "vuoro",
      sortable: false,
      filter: false,
      cellStyle: (params) => {
        // tyyli solulle, jos vuoro alkaa "|"-merkillä

        if (params.value && params.value.startsWith("|")) {
          return {
            color: "red",
            fontSize: "13px",
            fontWeight: "bold",
            fontStyle: "oblique",
            borderBottom: "2px solid gray",
            borderTop: "2px solid gray",
            backgroundColor: "lightgrey",
          };
        }
        return null; // Palauttaa oletustyylit, jos ehto ei toteudu
      },
    },
  ];

  const riviTeksti = {
    noRowsToShow: "Hae päivämäärällä ja tekijällä.",
  };

  if (kiertonumero > 14) {
    var jemmeri = kiertonumero % 14;
    setKiertonumero(jemmeri);
  } else if (kiertonumero < 0) {
    setKiertonumero("");
  }

  const kasitteleValinta = (event) => {
    setLahto(Number(event.target.value));
  };
  console.log(`${kiertonumero + 1} seur`);

  return (
    <>
      <AppBar
        position="static"
        style={{
          position: "fixed",
          width: "350px",
          backgroundColor: "var(--primary)",
          zIndex: "7",
        }}
      >
        <Toolbar>
          <Typography variant="h6">
            <div className="vHaku">
              <input
                onChange={muutos}
                placeholder="pv.kk.vvvv"
                className="paivainput"
              ></input>
              <button className="haeNappi" onClick={haku}>
                Hae
              </button>
              <select
                value={lahto}
                onChange={kasitteleValinta}
                className="alasVeto"
              >
                <Alasveto />
              </select>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        className="ag-theme-material"
        style={{
          height: "458px",
          marginTop: "50px",
          width: "350px",
          position: "fixed",
        }}
      >
        <AgGridReact
          rowData={uusiYhdistetty}
          columnDefs={columnDefs}
          localeText={riviTeksti}
          suppressHorizontalScroll={true}
          suppressVerticalScroll={true}
        />
      </div>

      {/*<div className="kellokierto">
        <KellonAika /> */}
      <div className="kellokierto">
        <div className="kierto">kiertonumero: {kiertonumero}</div>
      </div>
    </>
  );
};

export default Vuorohaku;
