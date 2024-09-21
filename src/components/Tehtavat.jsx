import { useState, useEffect } from "react";

import "./tyylit.css";

function Tehtavat() {
  const [esilla, setEsilla] = useState(false);
  const [nakyy, setNakyy] = useState(false);
  const [avain, setAvain] = useState("");
  const [team, setTeam] = useState("");
  const [hommat, setHommat] = useState({});

  const haeTehtavat = () => {
    fetch(import.meta.env.VITE_HOMMATFB)
      .then((response) => response.json())
      .then((data) => setHommat(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    haeTehtavat();
  }, []);

  const toiminta = (event) => {
    setEsilla(true);
    setTeam(event.target.name);
    console.log(team);
  };

  const hommelit = (key) => {
    setEsilla(false);
    setNakyy(true);
    setAvain(key);
  };

  const taakse = () => {
    setNakyy(false);
    setEsilla(true);
  };
  return (
    <div>
      <div className="raami1">
        <div className="tiimi">
          {Object.keys(hommat).map((key) => (
            <div key={key}>
              <div className="reittinappi1">
                <button onClick={toiminta} name={key} className="reittinappiB">
                  {key}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {esilla && (
        <div className="harmaaL">
          <div onClick={() => setEsilla(false)} className="x">
            x
          </div>

          <div className="raami">
            <div className="otsi">{team}</div>
            {Object.keys(hommat[team]).map((key) => (
              <div key={key} onClick={() => hommelit(key)} className="reitti">
                <div id={key} className="reittinappi">
                  <p>{key}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {nakyy && (
        <div className="harmaaL">
          <div onClick={() => taakse()} className="x">
            x
          </div>
          <div
            style={{
              color: "white",
              position: "fixed",
              marginLeft: "140px",
              fontSize: "16px",
              marginTop: "5px",
            }}
          >
            {avain}
          </div>
          <div style={{ marginTop: "30px" }}>
            {Object.entries(hommat[team][avain]).map(([aika, tyo], index) => (
              <table key={index}>
                <tbody>
                  <tr>
                    <th
                      style={{
                        width: "50px",
                        padding: "5px",
                        color: "black",
                        fontWeight: "200px",
                        backgroundColor: "white",
                        border: "1px solid black",
                      }}
                    >
                      {aika}
                    </th>
                    <th
                      style={{
                        width: "280px",
                        padding: "5px",
                        color: "black",
                        backgroundColor: "white",
                        border: "1px solid black",
                      }}
                    >
                      {tyo}
                    </th>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Tehtavat;
