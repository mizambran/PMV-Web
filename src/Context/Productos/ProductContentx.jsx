import Swal from "sweetalert2";

import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const productosLocalStorage =
    JSON.parse(localStorage.getItem("productosPMV")) || [];

  const [productos, setProductos] = useState(productosLocalStorage);

  // estado para abrir la modal
  const [show, setShow] = useState(false);

  // estado para poder editar
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // estado para saber si estoy editando o viendo
  const [editando, setEditando] = useState(false);

  const handleShow = () => {
    setEditando(false);
    setShow(true);
    setProductoSeleccionado(null);
    reset();
  };

  const handleClose = () => {
    setShow(false);
    setEditando(false);
    setProductoSeleccionado(null);
    reset();
  };

  // Productos de prueba
  const [productosSimulados, setProductosSimulados] = useState([
    {
      id: 1,
      nombre: "Zapatillas Running",
      precio: 15000,
      categoria: "Calzado",
    },
    { id: 2, nombre: "Camiseta Deportiva", precio: 8500, categoria: "Ropa" },
    {
      id: 3,
      nombre: "Reloj Inteligente",
      precio: 25000,
      categoria: "Accesorios",
    },
    {
      id: 4,
      nombre: "Auriculares Bluetooth",
      precio: 12000,
      categoria: "Tecnología",
    },
    { id: 5, nombre: "Mochila Urbana", precio: 9800, categoria: "Accesorios" },
    { id: 6, nombre: "Gorra Ajustable", precio: 4500, categoria: "Ropa" },
  ]);

  // estado para filtro de busqueda
  const [buscador, setBuscador] = useState("");

  const productosFiltrados = productos?.filter((producto) =>
    producto.nombre.toLowerCase().includes(buscador.toLowerCase()),
  );

  // Eliminar productos

  const eliminarProducto = (idRecibido, nombreRecibido) => {
    Swal.fire({
      title: "Seguro que quiere eliminar?",
      text: "Los cambios no podrán revertirse!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        const productosActualizados = productos.filter(
          (producto) => producto.id !== idRecibido,
        );

        setProductos(productosActualizados);

        Swal.fire({
          title: "Eliminado!",
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
    <ProductContext.Provider
      value={{
        productos,
        setProductos,
        eliminarProducto,
        buscador,
        setBuscador,
        productosFiltrados,
        show,
        setShow,
        handleShow,
        handleClose,
        productoSeleccionado,
        setProductoSeleccionado,
        editando,
        setEditando,
        productosSimulados,
        setProductosSimulados,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
