import Swal from "sweetalert2";

import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const productosLocalStorage =
    JSON.parse(localStorage.getItem("productosPMV")) || [];

  const [productos, setProductos] = useState(productosLocalStorage);

  // estado para abrir la modal de formulario Crear/Editar
  const [show, setShow] = useState(false);

  // estado para abrir modal de DetalleProducto.jsx
  const [showVer, setShowVer] = useState(false)

  // estado para poder editar
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // estado para saber si estoy editando o viendo
  const [editando, setEditando] = useState(false);

  const handleShow = () => {
    setEditando(false);
    setShow(true);
    setProductoSeleccionado(null);
  };

  const handleShowEditar = (producto) => {
    setProductoSeleccionado(producto)
    setEditando(true);
    setShow(true)
  }

  const handleClose = () => {
    setShow(false);
    setShowVer(false);
    setEditando(false);
    setProductoSeleccionado(null);
  };

  const handleShowVer = (producto) => {
    setProductoSeleccionado(producto);
    setEditando(false)
    setShowVer(true);
  }

  

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


  const [ofertaActiva , setOfertaActiva] = useState(true)

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
        showVer,
        setShowVer,
        handleShow,
        handleClose,
        handleShowEditar,
        handleShowVer,
        productoSeleccionado,
        setProductoSeleccionado,
        editando,
        setEditando,
        ofertaActiva,
        setOfertaActiva
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
