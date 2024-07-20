import ylakierto from "./ylakierto.json";

export const lista_jsonista = () => {
  const valilista = [];

  for (var i = 0; i < ylakierto.length; i++) {
    const kiertorivi = Object.values(ylakierto[i]);
    valilista.push(kiertorivi[0]);
  }
  const lista = valilista.flat();
  return lista;
};
