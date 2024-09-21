import { useState, useEffect } from "react";
import "../tyyli.css";
const KellonAika = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Siivoa intervalli, kun komponentti unmountataan
    return () => clearInterval(intervalId);
  }, []);

  const paivaus = () => {
    var nytDate = new Date();

    //----------- tämän hetkinen aika ----------
    var nytDateMuunnos = `${nytDate.getDate()}.${
      nytDate.getMonth() + 1
    }.${nytDate.getFullYear()}`;

    return nytDateMuunnos;
    //---------------------------------------------
  };

  return (
    <p className="KellonAika">
      {paivaus()} {time.toLocaleTimeString()}
    </p>
  );
};

export default KellonAika;
