import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { siipi_switch } from "./funk_vaunut/siipi_switch";

const firebaseConfig = {
  apiKey: "AIzaSyCoPYss0jsMH3q9PDzzMmABAfhy125Yf2Q",
  authDomain: "sikala-d0060.firebaseapp.com",
  databaseURL:
    "https://sikala-d0060-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "sikala-d0060",
  storageBucket: "sikala-d0060.appspot.com",
  messagingSenderId: "881281568551",
  appId: "1:881281568551:web:841dbebb613333c9dbe302",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const B_siipi = () => {
  const [osastot, setOsastot] = useState({});
  const [haetaan, setHaetaan] = useState(true);

  // Asynkroninen funktio tietojen hakemiseksi
  const hae = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const idToken = await user.getIdToken(); // Ei ole pakollinen, mutta voi olla tarpeen
        const dbRef = ref(database, "/");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setOsastot(snapshot.val());
        } else {
          console.log("No data available");
        }
      } else {
        console.log("User not signed in");
      }
      setHaetaan(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setHaetaan(false);
    }
  };

  // Käynnistä hae-funktio komponentin latauksen yhteydessä
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        hae();
      } else {
        console.log("User not signed in");
        setHaetaan(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Funktio resetoinnille
  const reset = async () => {
    let kopioOsastot = { ...osastot };

    Object.keys(kopioOsastot).forEach((rakennus) => {
      kopioOsastot[rakennus] = kopioOsastot[rakennus].map((ossi) => ({
        ...ossi,
        className: "laatikot",
      }));
    });

    setOsastot(kopioOsastot);
    await laheta();
  };

  // Funktio tietojen lähettämiselle
  const laheta = async () => {
    try {
      const dbRef = ref(database, "/");
      await set(dbRef, osastot);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  // Funktio merkinnän käsittelemiseksi
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
