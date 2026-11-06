import { useContext, useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Table } from "react-bootstrap";
import { ProductContext } from "../../Context/Productos/ProductContentx";
import { FaEye, FaPen, FaTrash, FaThLarge, FaList } from "react-icons/fa";
import { LuCloudUpload } from "react-icons/lu";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router-dom";

const ListadoDeProductos = ({ productosFiltrados, handleShowEditar }) => {
  const { eliminarProducto } = useContext(ProductContext);
  // Empieza en true para que por defecto sea Grilla
  const [vistaGrilla, setVistaGrilla] = useState(true);
  const navegacion = useNavigate();

  const cambiarVista = () => setVistaGrilla(!vistaGrilla);
  const verDetalle = (id) => navegacion(`/productos/${id}`);

  const exportarAExcel = () => {
    const hojaDeCalulo = utils.json_to_sheet(productosFiltrados);
    const libroDeTrabajo = utils.book_new();
    utils.book_append_sheet(libroDeTrabajo, hojaDeCalulo, "Productos");
    writeFile(libroDeTrabajo, "Productos.xlsx");
  };

  return (
    <div>
      <div className="mb-4 mt-4 d-flex justify-content-center align-items-center gap-3">
        {/* Botón con ícono para alternar vista */}
        <Button variant="outline-primary" onClick={cambiarVista} title={vistaGrilla ? "Ver como Tabla" : "Ver como Grilla"}>
          {vistaGrilla ? <FaList size={20} /> : <FaThLarge size={20} />}
        </Button>
        <Button variant="warning"><LuCloudUpload className="me-2"/> Importar</Button>
        <Button variant="success" onClick={exportarAExcel}><BsFileEarmarkSpreadsheetFill className="me-2"/> Exportar</Button>
      </div>

      {!vistaGrilla ? (
        <div className="container my-5">
          <Table striped bordered hover responsive className="shadow-sm bg-white">
            <thead className="table-dark">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>¿Es Oferta?</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados?.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <tr key={producto.id}>
                    <td className="align-middle">{producto.nombre}</td>
                    <td className="align-middle">{producto.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
                    <td className="align-middle">{producto.categoria}</td>
                    <td className="align-middle">{producto.ofertaActiva ? "Sí" : "No"}</td>
                    <td className="text-center">
                      <Button variant="success" className="me-2" size="sm" onClick={() => verDetalle(producto.id)}><FaEye /></Button>
                      <Button variant="warning" className="me-2" size="sm" onClick={() => handleShowEditar(producto)}><FaPen /></Button>
                      <Button variant="danger" size="sm" onClick={() => eliminarProducto(producto.id, producto.nombre)}><FaTrash /></Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center fw-bold p-4">No hay productos que coincidan con los filtros.</td></tr>
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <Container className="my-2">
          <Row xs={1} md={2} lg={3} className="g-4">
            {productosFiltrados?.length > 0 ? (
              productosFiltrados.map((producto) => (
                <Col key={producto.id}>
                  <Card className="h-100 border-0 shadow-sm transition-hover">
                    <div style={{ height: "250px", overflow: "hidden", position: "relative" }}>
                      <Card.Img variant="top" src={producto.imagenUno || "https://placehold.co/600x400?text=Producto+Demo"} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "1.5rem" }} />
                      <Badge bg="secondary" className="position-absolute top-0 start-0 m-3">{producto.categoria}</Badge>
                      <Badge bg="secondary" className="position-absolute top-0 start-0 m-3">{producto.categoria}</Badge>
                      {producto.ofertaActiva && <Badge bg="warning" className="position-absolute top-0 end-0 m-3 text-dark">Oferta</Badge>}
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-bold">{producto.nombre}</Card.Title>
                      <Card.Text className="text-muted small text-truncate">{producto.descripcion}</Card.Text>
                      
                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <span className="fs-5 fw-bold text-primary">
                          {producto.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
                        </span>
                        {/* Botones reubicados abajo a la derecha */}
                        <div className="d-flex gap-1">
                          <Button variant="outline-success" size="sm" onClick={() => verDetalle(producto.id)} title="Ver Detalle"><FaEye /></Button>
                          <Button variant="outline-warning" size="sm" onClick={() => handleShowEditar(producto)} title="Editar"><FaPen /></Button>
                          <Button variant="outline-danger" size="sm" onClick={() => eliminarProducto(producto.id, producto.nombre)} title="Eliminar"><FaTrash /></Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <h4 className="text-center text-muted w-100 p-5">No hay productos que coincidan con los filtros.</h4>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ListadoDeProductos;