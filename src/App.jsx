import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

import Muuta from "./sivut/Muuta";
import Vaunut from "./sivut/Vaunut";
import Vuorohaku from "./sivut/Vuorohaku";
import Alku from "./sivut/Alku";
import "./tyyli.css";
import "./muuttuvat.css";
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";
import KellonAika from "./components/KellonAika";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kuunnellaan Firebase Auth -tilaa
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const asetaVari = (vari, teksti) => {
    document.documentElement.style.setProperty("--primary", vari);
    document.documentElement.style.setProperty("--teksti", teksti);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <p>Ladataan...</p>;
  }

  if (!user) {
    return (
      <div>
        <h6 className="logOtsikko">Kirjautuminen</h6>
        <Login />
      </div>
    );
  }

  // Jos käyttäjä on kirjautunut:
  return (
    <>
      <BrowserRouter basename="/arbeit">
        <div className="ylapalk"></div>
        <div className="alapalk"></div>

        <nav style={{ marginLeft: "5px" }}>
          <UserInfo />
          <button onClick={handleLogout} className="logBut" style={{ marginLeft: "10px" }}>
            Kirjaudu ulos
          </button>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Alku&nbsp;
          </NavLink>
          <NavLink to="/Vuorohaku" className={({ isActive }) => (isActive ? "active" : "")}>
            | Vuoro |
          </NavLink>
          <NavLink to="/Vaunut" className={({ isActive }) => (isActive ? "active" : "")}>
            &nbsp;Vaunut&nbsp;
          </NavLink>
          <NavLink to="/Muuta" className={({ isActive }) => (isActive ? "active" : "")}>
            | Muuta
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Alku />} />
          <Route path="/Muuta" element={<Muuta />} />
          <Route path="/Vaunut" element={<Vaunut />} />
          <Route path="/Vuorohaku" element={<Vuorohaku />} />
          <Route path="*" element={<Alku />} />
        </Routes>
      </BrowserRouter>

      <div className="aladiv">
        <KellonAika />
        <div className="varit">
          <div className="vari0" onClick={() => asetaVari("rgb(115, 147, 179)", "black")}></div>
          <div className="vari1" onClick={() => asetaVari("rgb(0, 71, 171)", "white")}></div>
          <div className="vari3" onClick={() => asetaVari("rgb(53, 57, 53)", "white")}></div>
          <div className="vari4" onClick={() => asetaVari("rgb(37, 199, 75)", "black")}></div>
        </div>
      </div>
    </>
  );
}

export default App;
