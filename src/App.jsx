import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Muuta from "./sivut/Muuta";
import Vaunut from "./sivut/Vaunut";
import Vuorohaku from "./sivut/Vuorohaku";
import Alku from "./sivut/Alku";
import "./tyyli.css";
import CloseFullscreenSharpIcon from "@mui/icons-material/CloseFullscreenSharp";
import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";

const AuthComponents = () => {
  const location = useLocation();
  return location.pathname === "/" ? (
    <>
      <h6 className="logOtsikko">Kirjautuminen</h6>
      <div>
        <Login />
        <Signup />
      </div>
    </>
  ) : null;
};

function App() {
  function sovita() {
    // Lisää "fullscreen" luokka bodyyn tai muuhun haluttuun elementtiin
    document.body.classList.add("fullscreen");

    // Jos haluat poistaa muut luokat, jotka saattavat häiritä
    document.body.classList.remove("default-layout"); // Esimerkki, muokkaa tarvittaessa
  }

  // Käytetään useEffectiä sovita-funktion kutsumiseen, kun komponentti on ladattu
  useEffect(() => {
    sovita();
  }, []);

  return (
    <BrowserRouter basename="/arbeit">
      <div style={{ position: "absolute", zIndex: "7" }}>
        <AuthComponents />
      </div>
      <div className="boxi">
        <div className="ylapalk"></div>
      </div>
      <div className="alapalk"></div>
      <div
        style={{
          position: "absolute",
          fontSize: "10px",
          marginTop: "575px",
          marginLeft: "300px",
          zIndex: "5",
        }}
      >
        -
        <CloseFullscreenSharpIcon
          onClick={sovita}
          style={{
            color: "white",
            height: "15px",
            width: "15px",
          }}
        />
        -
      </div>

      <nav>
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
  );
}

export default App;
