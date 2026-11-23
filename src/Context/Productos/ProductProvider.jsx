import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import { productosMock } from "../../Helpers/productosBaseDemo";
import { guardarLocalStorage, leerLocalStorage } from "../../Helpers/almacenamiento";

export const ProductProvider = ({ children }) => {
  // Inicialización perezosa: localStorage se lee una sola vez (no en cada render)
  // y si el dato está corrupto se vuelve al mock de prueba.
  const [productos, setProductos] = useState(() => {
    const guardados = leerLocalStorage("productosPMV", null);
    return Array.isArray(guardados) ? guardados : productosMock;
  });

  const eliminarProducto = (idRecibido, nombreRecibido) => {
    Swal.fire({
      title: "¿Seguro que quiere eliminar?",
      text: "¡Los cambios no podrán revertirse!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Actualización funcional: usa siempre la lista más reciente
        setProductos((actuales) => actuales.filter((producto) => producto.id !== idRecibido));
        Swal.fire({
          title: "¡Eliminado!",
          text: `El producto ${nombreRecibido} fue eliminado`,
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    guardarLocalStorage("productosPMV", productos);
  }, [productos]);

  return (
    <ProductContext.Provider value={{ productos, setProductos, eliminarProducto }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
