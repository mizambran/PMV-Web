import { useContext, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { ProductContext } from "../../Context/Productos/ProductContentx";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import Table from "react-bootstrap/Table";

const ListadoDeProductos = () => {
  const {
    productosFiltrados,
    eliminarProducto,
    handleShowVer,
    handleShowEditar,
  } = useContext(ProductContext);

  const [toggleVista , setToggleVista] = useState(true)

  const cambiarVista = () => {
    setToggleVista(!toggleVista)
  }

  return (
    <div>
      <Button onClick={cambiarVista} className="ms-5" > {toggleVista ? "Ver Grilla" : "Ver Tabla"} </Button>
      {/* Vista Grilla */}
      {toggleVista ? (
        <div className="container my-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <tr key={producto.id}>
                  <td> {producto.nombre} </td>
                  <td>{producto.precio.toLocaleString('es-AR', {style:'currency', currency:'ARS'})}</td>
                  <td>{producto.categoria}</td>
                  <td>
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
                      <FaPen />{" "}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        eliminarProducto(producto.id, producto.nombre)
                      }
                      size="sm"
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <h3 className="text-center fw-bold w-100 p-3">
                No hay productos para mostrar.
              </h3>
            )}
          </tbody>
        </Table>
      </div>
      ) : (
        <div>
        <Container className="my-2">
          <h2 className="mb-4 fw-bold text-center">Listado de Productos</h2>
          <hr />

          {/* xs={1} (1 col en celu), md={2} (2 cols en tablet), lg={3} (3 cols en PC) */}
          <Row xs={1} md={2} lg={3} className="g-4">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <Col key={producto.id}>
                  <Card
                    className="h-100 border-0"
                    style={{ boxShadow: "0px 0px 8px #777373" }}
                  >
                    {/* Imagen  */}
                    <div
                      style={{
                        height: "250px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={
                          producto.imagenUno ||
                          "https://placehold.co/600x400?text=Producto+Demo"
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          backgroundColor: "#fff",
                          padding: "2rem",
                        }}
                      />
                      <Badge
                        bg="transparent"
                        className="position-absolute top-0 start-0 m-2"
                      >
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
                          <FaPen />{" "}
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() =>
                            eliminarProducto(producto.id, producto.nombre)
                          }
                          size="sm"
                        >
                          <FaTrash />
                        </Button>
                      </Badge>

                      <Badge
                        bg="secondary"
                        className="position-absolute top-0 end-0 m-2"
                      >
                        {producto.categoria}
                      </Badge>
                    </div>

                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{producto.nombre}</Card.Title>
                      <Card.Text className="text-muted small">
                        {producto.descripcion}
                      </Card.Text>

                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <span className="fs-5 fw-bold text-primary">
                          {producto.precio.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          })}
                        </span>
                        <Button
                          variant="dark"
                          size="sm"
                          onClick={() => handleShowVer(producto)}
                        >
                          Ver más
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <h3 className="text-center fw-bold w-100 p-3">
                No hay productos para mostrar.
              </h3>
            )}
          </Row>
        </Container>
      </div>
      )}

      {/* Vista Tabla */}

      
    </div>
  );
};

export default ListadoDeProductos;
