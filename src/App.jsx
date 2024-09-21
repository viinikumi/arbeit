import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
/*import { useEffect, useState } from "react";*/
import Muuta from "./sivut/Muuta";
import Vaunut from "./sivut/Vaunut";
import Vuorohaku from "./sivut/Vuorohaku";
import Alku from "./sivut/Alku";
import "./tyyli.css";
import "./muuttuvat.css";
/*import Signup from "./components/Signup"; */
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";
import KellonAika from "./components/KellonAika";

const AuthComponents = () => {
  const location = useLocation();
  return location.pathname === "/" ? (
    <>
      <h6 className="logOtsikko">Kirjautuminen</h6>
      <div>
        <Login />
        {/*<Signup />*/}
      </div>
    </>
  ) : null;
};

function App() {
  const asetaVari = (vari, teksti) => {
    const uusiVari = vari; // Uusi väri
    const tekstiVari = teksti;
    document.documentElement.style.setProperty("--primary", uusiVari);
    document.documentElement.style.setProperty("--teksti", tekstiVari);
  };
  return (
    <>
      <BrowserRouter basename="/arbeit">
        <div style={{ position: "static", zIndex: "7", maxHeight: "700px" }}>
          <AuthComponents />
        </div>
        <div className="boxi"></div>
        <div className="ylapalk"></div>

        <div className="alapalk"></div>

        <nav style={{ marginLeft: "5px" }}>
          <UserInfo />
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Alku&nbsp;
          </NavLink>
          <NavLink
            to="/Vuorohaku"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            | Vuoro |
          </NavLink>
          <NavLink
            to="/Vaunut"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            &nbsp;Vaunut&nbsp;
          </NavLink>
          <NavLink
            to="/Muuta"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
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
        <KellonAika style={{ zIndex: "7" }} />
        <div className="varit">
          <div
            className="vari0"
            onClick={() => asetaVari("rgb(115, 147, 179)", "black")}
          ></div>
          <div
            className="vari1"
            onClick={() => asetaVari("rgb(0, 71, 171)", "white")}
          ></div>
          {/*<div
            className="vari2"
            onClick={() => asetaVari("rgb(0, 255, 255)")}
  ></div> */}
          <div
            className="vari3"
            onClick={() => asetaVari("rgb(53, 57, 53)", "white")}
          ></div>
          <div
            className="vari4"
            onClick={() => asetaVari("rgb(37, 199, 75)", "black")}
          ></div>
          {/*<div
            className="vari5"
            onClick={() => asetaVari("rgb(204, 204, 255)")}
></div> */}
        </div>
      </div>
    </>
  );
}

export default App;
