// B_siipi.js
import { useState, useEffect } from "react";
import { ref, get, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebaseConfig"; // Tuo auth ja database
import { siipi_switch } from "./funk_vaunut/siipi_switch";

const B_siipi = () => {
  const [osastot, setOsastot] = useState({});
  const [haetaan, setHaetaan] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        hae(); // Kutsu hae-funktiota, jos käyttäjä on kirjautunut sisään
      } else {
        console.log("User not signed in");
        setHaetaan(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const hae = async () => {
    try {
      const dbRef = ref(database, "/");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setOsastot(snapshot.val());
        setHaetaan(false);
      } else {
        console.log("No data available");
        setHaetaan(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setHaetaan(false);
    }
  };

  // Lähetä data osastojen muuttuessa
  useEffect(() => {
    const laheta = async () => {
      try {
        const dbRef = ref(database, "/");
        await set(dbRef, osastot);
        console.log("Data sent successfully");
      } catch (error) {
        console.error("Error sending data:", error);
      }
    };

    if (Object.keys(osastot).length > 0) {
      laheta();
    }
  }, [osastot]);

  const reset = () => {
    let kopioOsastot = { ...osastot };

    Object.keys(kopioOsastot).forEach((rakennus) => {
      kopioOsastot[rakennus] = kopioOsastot[rakennus].map((ossi) => ({
        ...ossi,
        className: "laatikot",
      }));
    });

    setOsastot(kopioOsastot);
  };

  const merkinta = (event) => {
    let nro = event.target.id;
    let siipi = siipi_switch(nro);

    let paivita =
      osastot[siipi]?.map((os) => {
        if (os.id === event.target.id) {
          return {
            ...os,
            className: os.className === "laatikot" ? "laatikot2" : "laatikot",
          };
        }
        return os;
      }) || [];

    setOsastot({ ...osastot, [siipi]: paivita });
  };

  if (haetaan) {
    return <div>Haetaan...</div>;
  }

  return (
    <div>
      <h5 className="reset" onClick={reset}>
        reset
      </h5>
      <div className="Alueetbox">
        {Object.keys(osastot).map((key) => (
          <div key={key} className={`alueet${key}`}>
            <p className="siipiotsikko">{key}</p>
            {osastot[key]?.map((osasto) => (
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
        ))}
      </div>
    </div>
  );
};

export default B_siipi;
