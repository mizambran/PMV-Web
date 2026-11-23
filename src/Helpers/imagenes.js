export const IMAGEN_PLACEHOLDER = "https://placehold.co/600x400?text=Producto+Demo";

// Devuelve las imágenes cargadas del producto o el placeholder si no tiene ninguna.
export const imagenesDelProducto = (producto) => {
  const imagenes = [producto?.imagenUno, producto?.imagenDos, producto?.imagenTres].filter(Boolean);
  return imagenes.length > 0 ? imagenes : [IMAGEN_PLACEHOLDER];
};
