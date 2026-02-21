
/* //////////////////////////////////////////////////////////////////// ProductContext.jsx */

// estado para abrir la modal de formulario Crear/Editar
const [show, setShow] = useState(false);

// estado para abrir modal de DetalleProducto.jsx
const [showVer, setShowVer] = useState(false);

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
  setProductoSeleccionado(producto);
  setEditando(true);
  setShow(true);
};

const handleClose = () => {
  setShow(false);
  setShowVer(false);
  setEditando(false);
  setProductoSeleccionado(null);
};

const handleShowVer = (producto) => {
  setProductoSeleccionado(producto);
  setEditando(false);
  setShowVer(true);
};



/* //////////////////////////////////////////////////////////////////// FormProducto.jsx   */

// Crear

const crearProducto = (data) => {
    const nuevoProducto = {
      id: uuidv4(),
      nombre: data.nombre,
      descripcion: data.descripcion,
      caracteristicas: data.caracteristicas,
      precio: data.precio,
      categoria: data.categoria,
      imagenUno: data.imagenUno,
      imagenDos: data.imagenDos,
      imagenTres: data.imagenTres
    };

    setProductos([...productos, nuevoProducto]);
    reset();
    handleClose()

    Swal.fire(
      {
        title:"Creaste un producto!",
        text:`El producto ${data.nombre} creado con exito!`,
        icon:"success"
      })
  };


// Editando
const guardarCambios = (data) => {
  const productosEditados = productos.map((producto) =>
    producto.id === productoSeleccionado.id
      ? { ...data, id: producto.id }
      : producto,
  );

  setProductos(productosEditados);
  handleClose();
  Swal.fire(
    "Actualizado",
    `El producto "${data.nombre}" fue editado correctamente.`,
    "success",
  );
};

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
  } else {
    // Limpiamos el formulario si no estamos editando o el producto es null
    reset();
  }
}, [productoSeleccionado, editando, setValue, reset]);

// En onSubmit guardamos la función de crear y editar producto

const onSubmit = (data) => {
  if (editando) {
    guardarCambios(data);
  } else {
    crearProducto(data);
  }
};
<Form onSubmit={handleSubmit(onSubmit)}></Form>;


/* //////////////////////////////////////////////////////////////////// ListadoDeProductos.jsx */


productosFiltrados.map((producto) => (
  <div>
    Otros elementos imagen, titulo, parragfos, etc
    <Badge bg="transparent" className="position-absolute top-0 start-0 m-2">
      <Button
        variant="success"
        className="me-2"
        size="sm"
        onClick={() => handleShowVer(producto)}
      >
        <FaEye />
      </Button>
      <Button
        variant="warning"
        className="me-2"
        size="sm"
        onClick={() => handleShowEditar(producto)}
      >
        <FaPen />
      </Button>
      <Button
        variant="danger"
        onClick={() => eliminarProducto(producto.id, producto.nombre)}
        size="sm"
      >
        <FaTrash />
      </Button>
    </Badge>
  </div>
));



/* //////////////////////////////////////// DetalleProducto.jsx */


// Si no hay producto y no estamos editando, no renderizamos nada para evitar errores
if (!productoSeleccionado) return null;
<Modal show={showVer} onHide={handleClose} size="fullscreen">
  <Col lg={7}>
    {/* Carrusel de Imágenes */}
    <Carousel variant="dark" className="shadow-sm bg-white rounded">
      {[
        productoSeleccionado?.imagenUno,
        productoSeleccionado?.imagenDos,
        productoSeleccionado?.imagenTres,
      ]
        .filter((img) => img) // Solo mostramos las que existen
        .map((img, index) => (
          <Carousel.Item key={index} style={{ height: "500px" }}>
            <img
              className="d-block w-100 h-100"
              src={img}
              alt={`Imagen ${index + 1}`}
              style={{ objectFit: "contain", padding: "20px" }}
            />
          </Carousel.Item>
        ))}
    </Carousel>
  </Col>
</Modal>;
