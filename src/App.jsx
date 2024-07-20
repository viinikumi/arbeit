import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Muuta from "./sivut/Muuta";
import Vaunut from "./sivut/Vaunut";
import Vuorohaku from "./sivut/Vuorohaku";
import Alku from "./sivut/Alku";
import "./tyyli.css";
import CloseFullscreenSharpIcon from "@mui/icons-material/CloseFullscreenSharp";

function App() {
  function sovita() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const currentUrl = window.location.href;
    window.open(
      currentUrl,
      "_blank",
      `width=${screenWidth},height=${screenHeight}`
    );
  }

  return (
    <>
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

      <BrowserRouter basename="/arbeit">
        <nav>
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
    </>
  );
}

export default App;
