export const kartoitaPaivat = (uusiUusi, uusin, viikonPaivat) => {
  uusiUusi.map((paivaus) => {
    var paiva = paivaus.getDate();
    var vpaiva = paivaus.getDay();
    var kk = paivaus.getMonth();
    var vvvv = paivaus.getFullYear();
    uusin.push(`${viikonPaivat[vpaiva]} ${paiva}.${kk + 1}.${vvvv}`);
  });
  return uusiUusi, viikonPaivat;
};
