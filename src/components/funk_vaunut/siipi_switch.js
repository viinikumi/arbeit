export const siipi_switch = (nro) => {
  let siipi = "";

  switch (true) {
    case nro < 13:
      siipi = "B";
      break;
    case nro >= 13 && nro < 16:
      siipi = "L";
      break;
    case nro >= 16 && nro < 21:
      siipi = "N";
      break;
    case nro >= 21 && nro < 34:
      siipi = "T";
      break;
    case nro === 34:
      siipi = "FM6";
      break;
    case nro >= 35 && nro < 40:
      siipi = "D";
      break;
    case nro >= 40 && nro < 44:
      siipi = "K";
      break;
    case nro >= 44 && nro < 46:
      siipi = "COXA";
      break;
    case nro >= 46 && nro < 48:
      siipi = "FM1";
      break;
    case nro >= 48 && nro < 50:
      siipi = "E";
      break;
    case 49 < nro < 52:
      siipi = "R";
      break;

    default:
      siipi = "ei löydy";
  }

  return siipi;
};
