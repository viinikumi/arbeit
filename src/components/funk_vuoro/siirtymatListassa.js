export const siirtymatListassa = (siirtyma, pl, lista) => {
  if (siirtyma > 293) {
    let kerrat = Math.floor(siirtyma / 293);
    siirtyma = siirtyma - 294 * kerrat;
  }

  for (
    var haettuaAiemmasta = siirtyma - 3;
    haettuaAiemmasta < siirtyma + 5;
    haettuaAiemmasta++
  ) {
    let jakoIndeksi = ((haettuaAiemmasta % 294) + 294) % 294; // tyäkiertolistanlopusta alkuun

    if (jakoIndeksi === siirtyma) {
      pl.push("| " + lista[jakoIndeksi] + " |");
    } else {
      pl.push(lista[jakoIndeksi]);
    }
  }
  return pl, siirtyma, lista;
};
