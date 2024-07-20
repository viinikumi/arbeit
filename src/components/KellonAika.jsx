import { useState, useEffect } from "react";

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
    <div
      style={{
        fontSize: 12,
      }}
    >
      <p>
        {paivaus()} {time.toLocaleTimeString()}
      </p>
    </div>
  );
};

export default KellonAika;
