// Formatea un precio en pesos argentinos. Tolera valores vacíos o en texto
// (por ejemplo, productos importados desde Excel).
export const convertirPrecio = (precio) => {
  const numero = Number(precio);
  return (Number.isFinite(numero) ? numero : 0).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
};
