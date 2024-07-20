import "../tyyli.css";
import EngineeringIcon from "@mui/icons-material/Engineering";

const Muuta = () => {
  return (
    <>
      <EngineeringIcon style={{ zIndex: "-2", color: "white" }} />;
      <div
        style={{
          zIndex: "-2",
          color: "black",
          position: "flex",
          marginLeft: "100px",
        }}
      >
        eipä täälä mittää
      </div>
    </>
  );
};

export default Muuta;
