import Swal from "sweetalert2";
import { createContext, useEffect, useState } from "react";
import { productosMock } from "../../Helpers/productosBaseDemo";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // Leemos de localStorage o cargamos el mock de prueba
  const productosLocalStorage = JSON.parse(localStorage.getItem("productosPMV")) || productosMock;
  const [productos, setProductos] = useState(productosLocalStorage);

  // Única función que modifica el estado global
  const eliminarProducto = (idRecibido, nombreRecibido) => {
    Swal.fire({
      title: "¿Seguro que quiere eliminar?",
      text: "¡Los cambios no podrán revertirse!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        const productosActualizados = productos.filter(
          (producto) => producto.id !== idRecibido
        );
        setProductos(productosActualizados);
        Swal.fire({
          title: "¡Eliminado!",
          text: `El producto ${nombreRecibido} fue eliminado`,
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("productosPMV", JSON.stringify(productos));
  }, [productos]);

  return (
    <ProductContext.Provider value={{ productos, setProductos, eliminarProducto }}>
      {children}
    </ProductContext.Provider>
  );
};