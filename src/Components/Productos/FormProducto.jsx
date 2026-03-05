import React, { useContext, useEffect } from "react";
import { Button, Card, Badge, Carousel } from "react-bootstrap";
import ListadoDeProductos from "./ListadoDeProductos";
import { FaPlus } from "react-icons/fa";
import { ProductContext } from "../../Context/Productos/ProductContentx";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";

const FormProducto = () => {
  const {
    setBuscador,
    productos,
    setProductos,
    show,
    handleShow,
    handleClose,
    productoSeleccionado,
    editando
    
  } = useContext(ProductContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

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


  /* Logica preview */

  const nombrePreview = watch("nombre");
  const descripcionPreview = watch("descripcion");

  const precioValue = watch("precio");
  const precioPreview = precioValue
    ? Number(precioValue).toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      })
    : "$0";

  const categoriaPreview = watch("categoria");
  const imagenPreviewUno = watch("imagenUno");
  const imagenPreviewDos = watch("imagenDos");
  const imagenPreviewTres = watch("imagenTres");

  // Para limpiar la modal cuando se cierre
  useEffect(() => {

    if(!show) {
      reset()
    }
  }, [show, reset])

  // Editando 
  const guardarCambios = (data) => {
    const productosEditados = productos.map((producto) => producto.id === productoSeleccionado.id ?
  {...data, id: producto.id} : producto)

  setProductos(productosEditados);
  handleClose();
  Swal.fire('Actualizado', `El producto "${data.nombre}" fue editado correctamente.`, 'success')
  }

  useEffect(() => {
    if(editando && productoSeleccionado){

      setValue("nombre", productoSeleccionado.nombre)
      setValue("descripcion", productoSeleccionado.descripcion)
      setValue("caracteristicas", productoSeleccionado.caracteristicas)
      setValue("categoria", productoSeleccionado.categoria)
      setValue("precio", productoSeleccionado.precio)
      setValue("imagenUno", productoSeleccionado.imagenUno)
      setValue("imagenDos", productoSeleccionado.imagenDos)
      setValue("imagenTres", productoSeleccionado.imagenTres)
    } else {
      // Limpiamos el formulario si no estamos editando o el producto es null
      reset()
    }
  }, [productoSeleccionado, editando, setValue, reset])


  // En onSubmit guardamos la función de crear y editar producto

  const onSubmit = (data) => {
    if(editando){
      guardarCambios(data)
    } else {
      crearProducto(data)
    }
  }

  return (
    <div>
      <div
        className="container my-4"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "6rem",
        }}
      >
        <Button type="button" variant="success" onClick={handleShow}>
          <FaPlus /> Agregar Producto
        </Button>
        <input
          type="search"
          className="form-control w-50"
          placeholder="🔍 Buscar producto..."
          onChange={(e) => setBuscador(e.target.value)}
          style={{ border: "1px solid black" }}
        />
      </div>
      <div>
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton bg="dark" variant="dark">
            <Modal.Title> {editando ? (<h4>Editando <span className="text-primary">"{productoSeleccionado.nombre}"</span></h4>) : `Creando Producto` } </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                }}
              >
                {/* Formulario de carga del producto */}
                <div className="col-10 col-lg-5">
                  <Form.Group className="mb-3">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej: Mochila Urbana"
                      {...register("nombre", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.nombre?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Descripción Breve</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej: Ideal para viajes y turismo..."
                      {...register("descripcion", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.descripcion?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Caracteristicas</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder="Cada vez que termines una caracteristica, presiona enter"
                      {...register("caracteristicas", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.caracteristicas?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Ej: 15.000"
                      step={0.01}
                      {...register("precio", {
                        required: "Este campo es obligatorio",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Solo se permiten números",
                        },
                        valueAsNumber:true
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.precio?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      {...register("categoria", {
                        required: "Tenes que seleccionar una categoría",
                      })}
                    >
                      <option>Seleccionar</option>
                      <option value="Accesorios">Accesorios</option>
                      <option value="Ropa">Ropa</option>
                      <option value="Calzado">Calzado</option>
                      <option value="Tecnologia">Tecnología</option>
                      <option value="Electrodomesticos">Electrodomesticos</option>
                    </Form.Select>
                    <Form.Text className="text-danger">
                      {errors.categoria?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Imagen 1</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Ej: google.com/drive/img1"
                      {...register("imagenUno")}
                    />
                    <Form.Text className="text-danger">
                      {errors.imagenUno?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Imagen 2</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Ej: google.com/drive/img1"
                      {...register("imagenDos")}
                    />
                    <Form.Text className="text-danger">
                      {errors.imagenDos?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Imagen 3</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Ej: google.com/drive/img1"
                      {...register("imagenTres")}
                    />
                    <Form.Text className="text-danger">
                      {errors.imagenTres?.message}
                    </Form.Text>
                  </Form.Group>
                </div>

                {/* Preview de la carga del producto */}
                <div className="col-12  col-lg-6">
                  <div style={{ width: "100%", height: "30rem" }}>
                    <Card style={{ height: "100%" }}>
                      <Card.Body className="d-flex flex-column">
                        <Carousel>
                          <Carousel.Item>
                            <Card.Img
                          variant="top"
                          src={imagenPreviewUno || "https://via.placeholder.com/300?text=Sin+Imagen"}
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "contain",
                            padding:"0.75rem"
                          }}
                          onError={(e) => {e.target.src = "https://placehold.co/600x400?text=Producto+Demo"}}
                        />
                          </Carousel.Item>
                          <Carousel.Item>
                            <Card.Img
                          variant="top"
                          src={imagenPreviewDos || "https://via.placeholder.com/300?text=Sin+Imagen"}
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "contain",
                            padding:"0.75rem"
                          }}
                          onError={(e) => {e.target.src = "https://placehold.co/600x400?text=Producto+Demo"}}
                        />
                          </Carousel.Item>
                          <Carousel.Item>
                            <Card.Img
                          variant="top"
                          src={imagenPreviewTres || "https://via.placeholder.com/300?text=Sin+Imagen"}
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "contain",
                            padding:"0.75rem"
                          }}
                          onError={(e) => {e.target.src = "https://placehold.co/600x400?text=Producto+Demo"}}
                        />
                          </Carousel.Item>
                        </Carousel>
                        <Card.Title className="mt-2">{nombrePreview}</Card.Title>
                        <Card.Text className="text-muted small">
                          {descripcionPreview}
                        </Card.Text>

                        <div className="mt-auto d-flex justify-content-between align-items-center">
                          <span className="fs-5 fw-bold text-primary">
                            {precioPreview}
                          </span>
                          <Button
                            type="button"
                            variant="dark"
                            size="sm"
                            disabled
                          >
                            Ver más
                          </Button>

                          <Badge
                            bg="secondary"
                            className="position-absolute top-0 end-0 m-2"
                          >
                            {categoriaPreview}
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                  <div
                    className="mt-3"
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      gap: "0.4rem",
                    }}
                  >
                    <Button
                      type="button"
                      variant="danger"
                      onClick={handleClose}
                    >
                      Cerrar
                    </Button>
                    <Button type="submit" variant="primary">
                      Guardar
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <ListadoDeProductos />
    </div>
  );
};

export default FormProducto;
