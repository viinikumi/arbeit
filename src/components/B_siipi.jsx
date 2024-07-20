import { useState, useEffect } from "react";
import { siipi_switch } from "./funk_vaunut/siipi_switch";

const B_siipi = () => {
  const [osastot, setOsastot] = useState({});
  const [haetaan, setHaetaan] = useState(true);

  async function hae() {
    try {
      const vastaus = await fetch(
        "https://sikala-d0060-default-rtdb.europe-west1.firebasedatabase.app/.json"
      );
      const tiedot = await vastaus.json();
      setOsastot(tiedot);
      setHaetaan(false);
    } catch (error) {
      console.log("virhe", error);
      setHaetaan(false);
    }
  }

  useEffect(() => {
    hae();
  }, []);

  if (haetaan) {
    return <div>Haetaan...</div>;
  }
  const reset = () => {
    let kopioOsastot = { ...osastot };

    Object.keys(kopioOsastot).forEach((rakennus) => {
      kopioOsastot[rakennus] = kopioOsastot[rakennus].map((ossi) => {
        return { ...ossi, className: "laatikot" };
      });
    });
    setOsastot(kopioOsastot);
    laheta();
  };

  const laheta = () => {
    fetch(
      "https://sikala-d0060-default-rtdb.europe-west1.firebasedatabase.app/.json",
      {
        method: "PUT",
        body: JSON.stringify(osastot),
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const merkinta = (event) => {
    let nro = event.target.id;
    let siipi = siipi_switch(nro);

    let paivita = osastot[siipi].map((os) => {
      if (os.id === event.target.id) {
        return {
          ...os,
          className: os.className === "laatikot" ? "laatikot2" : "laatikot",
        };
      }
      return os;
    });
    setOsastot({ ...osastot, [siipi]: paivita });
  };

  laheta();

  return (
    <div>
      <h5 className="reset" onClick={reset}>
        reset
      </h5>
      <div className="Alueetbox">
        <div className="alueetB">
          <p className="siipiotsikko">B</p>
          {osastot.B &&
            osastot.B.map((osasto) => (
              <div key={osasto.nimi}>
                <p
                  className={osasto.className}
                  id={osasto.id}
                  onClick={merkinta}
                >
                  {osasto.nimi}
                </p>
              </div>
            ))}
        </div>
        <div className="alueetL">
          <p className="siipiotsikko">L</p>
          {osastot.L &&
            osastot.L.map((osasto) => (
              <div key={osasto.nimi}>
                <p
                  className={osasto.className}
                  id={osasto.id}
                  onClick={merkinta}
                >
                  {osasto.nimi}
                </p>
              </div>
            ))}
        </div>

        <div className="alueetN">
          <p className="siipiotsikko">N</p>
          {osastot.N &&
            osastot.N.map((osasto) => (
              <div key={osasto.nimi}>
                <p
                  className={osasto.className}
                  id={osasto.id}
                  onClick={merkinta}
                >
                  {osasto.nimi}
                </p>
              </div>
            ))}
        </div>

        <div className="alueetT">
          <p className="siipiotsikko">T</p>
          {osastot.T &&
            osastot.T.map((osasto) => (
              <div key={osasto.nimi}>
                <p
                  className={osasto.className}
                  id={osasto.id}
                  onClick={merkinta}
                >
                  {osasto.nimi}
                </p>
              </div>
            ))}
        </div>

        <div className="alueetD">
          <p className="siipiotsikko">D</p>
          {osastot.D &&
            osastot.D.map((osasto) => (
              <div key={osasto.nimi}>
                <p
                  className={osasto.className}
                  id={osasto.id}
                  onClick={merkinta}
                >
                  {osasto.nimi}
                </p>
              </div>
            ))}
        </div>

        <div className="alueetCOXA">
          <p className="siipiotsikko">CX</p>
          {osastot.COXA &&
            osastot.COXA.map((osasto) => (
              <div key={osasto.nimi}>
                <p
                  className={osasto.className}
                  id={osasto.id}
                  onClick={merkinta}
                >
                  {osasto.nimi}
                </p>
              </div>
            ))}
        </div>

        <div className="alueetE">
          <p className="siipiotsikko">E</p>
          {osastot.E &&
            osastot.E.map((osasto) => (
              <div key={osasto.nimi}>
                <p
                  className={osasto.className}
                  id={osasto.id}
                  onClick={merkinta}
                >
                  {osasto.nimi}
                </p>
              </div>
            ))}
        </div>

        <div className="alueetR">
          <p className="siipiotsikko">R</p>
          {osastot.R &&
            osastot.R.map((osasto) => (
              <div key={osasto.nimi}>
                <p
                  className={osasto.className}
                  id={osasto.id}
                  onClick={merkinta}
                >
                  {osasto.nimi}
                </p>
              </div>
            ))}
        </div>

        <div className="alueetK">
          <p className="siipiotsikko">K</p>
          {osastot.K &&
            osastot.K.map((osasto) => (
              <div key={osasto.nimi}>
                <p
                  className={osasto.className}
                  id={osasto.id}
                  onClick={merkinta}
                >
                  {osasto.nimi}
                </p>
              </div>
            ))}
        </div>

        <div className="alueetFM1">
          <p className="siipiotsikko">FM1</p>
          {osastot.FM1 &&
            osastot.FM1.map((osasto) => (
              <div key={osasto.nimi}>
                <p
                  className={osasto.className}
                  id={osasto.id}
                  onClick={merkinta}
                >
                  {osasto.nimi}
                </p>
              </div>
            ))}
        </div>
        <div className="alueetF">
          <p className="siipiotsikko">F</p>
          {osastot.VERV &&
            osastot.VERV.map((osasto) => (
              <div key={osasto.nimi}>
                <p
                  className={osasto.className}
                  id={osasto.id}
                  onClick={merkinta}
                >
                  {osasto.nimi}
                </p>
              </div>
            ))}
        </div>

        <div className="alueetFM6">
          <p className="siipiotsikko">SILO</p>
          {osastot.SILO &&
            osastot.SILO.map((osasto) => (
              <div key={osasto.nimi}>
                <p
                  className={osasto.className}
                  id={osasto.id}
                  onClick={merkinta}
                >
                  {osasto.nimi}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default B_siipi;
