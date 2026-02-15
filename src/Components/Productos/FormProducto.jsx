import React, { useContext } from "react";
import { Button, Card, Badge } from "react-bootstrap";
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
    productosFiltrados,
    show,
    setShow,
    handleShow,
    handleClose,
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
      imagen: data.imagen,
    };

    setProductos([...productos, nuevoProducto]);
    reset();
    Swal.fire(
      "Creaste un producto!",
      `El producto ${data.nombre} creado con exito!`,
      "success",
    );
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
  const imagenPreview = watch("imagen");

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
          <Modal.Header closeButton>
            <Modal.Title>Creando Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(crearProducto)}>
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
                      type="text"
                      placeholder="Ej: Forrada en cuero, impermeable, 3 bolsillos..."
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
                    </Form.Select>
                    <Form.Text className="text-danger">
                      {errors.categoria?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Ej: google.com/drive/img1"
                      {...register("imagen")}
                    />
                    <Form.Text className="text-danger">
                      {errors.imagen?.message}
                    </Form.Text>
                  </Form.Group>
                </div>

                {/* Preview de la carga del producto */}
                <div className="col-12  col-lg-6">
                  <div style={{ width: "100%", height: "30rem" }}>
                    <Card style={{ height: "100%" }}>
                      <Card.Body className="d-flex flex-column">
                        <Card.Img
                          variant="top"
                          src={imagenPreview || "https://via.placeholder.com/300?text=Sin+Imagen"}
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "contain",
                          }}
                          onError={(e) => {e.target.src = "https://placehold.co/600x400?text=Producto+Demo"}}
                        />
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
                      variant="secondary"
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
      <ListadoDeProductos></ListadoDeProductos>
    </div>
  );
};

export default FormProducto;
