import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Badge, Carousel, Modal, Form } from "react-bootstrap";
import ListadoDeProductos from "./ListadoDeProductos";
import { FaPlus } from "react-icons/fa";
import { ProductContext } from "../../Context/Productos/ProductContentx";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const FormProducto = () => {
  const { productos, setProductos } = useContext(ProductContext);

  const [show, setShow] = useState(false);
  const [editando, setEditando] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  
  // Estados para Filtros
  const [buscador, setBuscador] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroOferta, setFiltroOferta] = useState("");
  const [filtroPrecio, setFiltroPrecio] = useState("");

  // Lógica de filtrado y ordenamiento combinada
  let productosFiltrados = productos?.filter((producto) => {
    const matchBuscador = producto.nombre.toLowerCase().includes(buscador.toLowerCase());
    const matchCategoria = filtroCategoria === "" || producto.categoria === filtroCategoria;
    const matchOferta = filtroOferta === "" || (filtroOferta === "true" ? producto.ofertaActiva : !producto.ofertaActiva);
    return matchBuscador && matchCategoria && matchOferta;
  });

  if (filtroPrecio === "asc") {
    productosFiltrados.sort((a, b) => a.precio - b.precio);
  } else if (filtroPrecio === "desc") {
    productosFiltrados.sort((a, b) => b.precio - a.precio);
  }

  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();

  const handleShow = () => {
    setEditando(false);
    setProductoSeleccionado(null);
    reset();
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setEditando(false);
    setProductoSeleccionado(null);
    reset();
  };

  const handleShowEditar = (producto) => {
    setProductoSeleccionado(producto);
    setEditando(true);
    setShow(true);
  };

  const crearProducto = (data) => {
    const nuevoProducto = { id: uuidv4(), ...data };
    setProductos([...productos, nuevoProducto]);
    handleClose();
    Swal.fire({ title: "¡Creaste un producto!", text: `El producto ${data.nombre} creado con éxito!`, icon: "success" });
  };

  const guardarCambios = (data) => {
    const productosEditados = productos.map((producto) =>
      producto.id === productoSeleccionado.id ? { ...data, id: producto.id } : producto
    );
    setProductos(productosEditados);
    handleClose();
    Swal.fire("Actualizado", `El producto "${data.nombre}" fue editado correctamente.`, "success");
  };

  const onSubmit = (data) => editando ? guardarCambios(data) : crearProducto(data);

  useEffect(() => {
    if (editando && productoSeleccionado) {
      setValue("nombre", productoSeleccionado.nombre);
      setValue("descripcion", productoSeleccionado.descripcion);
      setValue("caracteristicas", productoSeleccionado.caracteristicas);
      setValue("categoria", productoSeleccionado.categoria);
      setValue("precio", productoSeleccionado.precio);
      setValue("imagenUno", productoSeleccionado.imagenUno);
      setValue("imagenDos", productoSeleccionado.imagenDos);
      setValue("imagenTres", productoSeleccionado.imagenTres);
      setValue("ofertaActiva", productoSeleccionado.ofertaActiva || false);
    }
  }, [productoSeleccionado, editando, setValue]);

  const nombrePreview = watch("nombre");
  const descripcionPreview = watch("descripcion");
  const precioPreview = watch("precio") ? Number(watch("precio")).toLocaleString("es-AR", { style: "currency", currency: "ARS" }) : "$0";
  const categoriaPreview = watch("categoria");
  const imagenPreviewUno = watch("imagenUno");
  const ofertaPreview = watch("ofertaActiva");

  return (
    <div>
      <div className="container my-4">
        {/* Barra de Controles y Filtros */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 bg-white p-3 rounded shadow-sm border">
          <Button type="button" variant="success" onClick={handleShow} className="fw-bold">
            <FaPlus className="me-2" /> Agregar Producto
          </Button>
          
          <div className="d-flex flex-wrap gap-2 flex-grow-1 justify-content-end align-items-center">
            <Form.Control
              type="search"
              placeholder="🔍 Buscar producto..."
              onChange={(e) => setBuscador(e.target.value)}
              style={{ maxWidth: "250px" }}
            />
            <Form.Select style={{ maxWidth: "150px" }} onChange={(e) => setFiltroCategoria(e.target.value)}>
              <option value="">Todas</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Ropa">Ropa</option>
              <option value="Calzado">Calzado</option>
              <option value="Tecnologia">Tecnología</option>
              <option value="Electrodomesticos">Electrodomesticos</option>
            </Form.Select>
            <Form.Select style={{ maxWidth: "130px" }} onChange={(e) => setFiltroOferta(e.target.value)}>
              <option value="">Todas</option>
              <option value="true">En Oferta</option>
              <option value="false">Sin Oferta</option>
            </Form.Select>
            <Form.Select style={{ maxWidth: "160px" }} onChange={(e) => setFiltroPrecio(e.target.value)}>
              <option value="">Ordenar Precio</option>
              <option value="asc">Menor a Mayor</option>
              <option value="desc">Mayor a Menor</option>
            </Form.Select>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton bg="dark" variant="dark">
          <Modal.Title>{editando ? <h4>Editando <span className="text-primary">"{productoSeleccionado?.nombre}"</span></h4> : `Creando Producto`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
              <div className="col-10 col-lg-5">
                <Form.Group className="mb-3"><Form.Label>Titulo</Form.Label><Form.Control type="text" {...register("nombre", { required: "Obligatorio" })} /><Form.Text className="text-danger">{errors.nombre?.message}</Form.Text></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Descripción Breve</Form.Label><Form.Control type="text" {...register("descripcion", { required: "Obligatorio" })} /><Form.Text className="text-danger">{errors.descripcion?.message}</Form.Text></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Características</Form.Label><Form.Control as="textarea" {...register("caracteristicas", { required: "Obligatorio" })} /><Form.Text className="text-danger">{errors.caracteristicas?.message}</Form.Text></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Precio</Form.Label><Form.Control type="number" step={0.01} {...register("precio", { required: "Obligatorio", valueAsNumber: true })} /><Form.Text className="text-danger">{errors.precio?.message}</Form.Text></Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select {...register("categoria", { required: "Seleccionar" })}>
                    <option value="">Seleccionar</option><option value="Accesorios">Accesorios</option><option value="Ropa">Ropa</option><option value="Calzado">Calzado</option><option value="Tecnologia">Tecnología</option><option value="Electrodomesticos">Electrodomesticos</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3"><Form.Check type="switch" label="¿Marcar como Oferta Activa?" {...register("ofertaActiva")} /></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Imagen 1</Form.Label><Form.Control type="url" {...register("imagenUno")} /></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Imagen 2</Form.Label><Form.Control type="url" {...register("imagenDos")} /></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Imagen 3</Form.Label><Form.Control type="url" {...register("imagenTres")} /></Form.Group>
              </div>
              <div className="col-12 col-lg-6">
                <Card style={{ height: "30rem" }}>
                  <Card.Body className="d-flex flex-column position-relative">
                    {ofertaPreview && <Badge bg="warning" className="position-absolute top-0 start-0 m-3 z-3 text-dark">¡Oferta!</Badge>}
                    <Carousel><Carousel.Item><Card.Img variant="top" src={imagenPreviewUno || "https://placehold.co/600x400?text=Producto+Demo"} style={{ width: "100%", height: "250px", objectFit: "contain", padding: "0.75rem" }} /></Carousel.Item></Carousel>
                    <Card.Title className="mt-2">{nombrePreview}</Card.Title>
                    <Card.Text className="text-muted small">{descripcionPreview}</Card.Text>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fs-5 fw-bold text-primary">{precioPreview}</span>
                      <Badge bg="secondary">{categoriaPreview}</Badge>
                    </div>
                  </Card.Body>
                </Card>
                <div className="mt-3 d-flex justify-content-end gap-2">
                  <Button type="button" variant="danger" onClick={handleClose}>Cerrar</Button>
                  <Button type="submit" variant="primary">Guardar</Button>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ListadoDeProductos productosFiltrados={productosFiltrados} handleShowEditar={handleShowEditar} />
    </div>
  );
};

export default FormProducto;