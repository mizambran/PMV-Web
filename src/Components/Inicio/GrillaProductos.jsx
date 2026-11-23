import { useContext } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { LuShoppingCart } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../Context/Productos/ProductContext';
import { convertirPrecio } from '../../Helpers/calculos';
import { IMAGEN_PLACEHOLDER } from '../../Helpers/imagenes';

const GrillaProductos = () => {
  // Para una demo luego uso la API de mi back
  const { productos } = useContext(ProductContext)

  const navegacion = useNavigate()

  const verDetalle = (id) => {
    navegacion(`/productos/${id}`)
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4 fw-bold text-center">Nuestros Productos</h2>
      <hr />

      {productos.length === 0 && (
        <p className="text-center text-muted py-5">Todavía no hay productos cargados.</p>
      )}

      {/* xs={1} (1 col en celu), md={2} (2 cols en tablet), lg={3} (3 cols en PC)*/}
      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        {productos.map((producto) => (
          <Col key={producto.id}>
            <Card className="h-100 border-0" style={{ boxShadow: "0px 0px 8px #777373" }}>
              <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                <Card.Img
                  variant="top"
                  src={producto.imagenUno || IMAGEN_PLACEHOLDER}
                  alt={producto.nombre}
                  onError={(e) => { e.currentTarget.src = IMAGEN_PLACEHOLDER }}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: "#fff", padding: "0.75rem" }}
                />
                {producto.ofertaActiva && (
                  <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">
                    Oferta
                  </Badge>
                )}
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text className="text-muted small">
                  {producto.descripcion}
                </Card.Text>

                <div className="mt-auto d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <span className="fs-4 fw-bold text-primary">
                    {convertirPrecio(producto.precio)}
                  </span>
                  <div className="d-flex gap-2">
                    {/* Carrito pendiente de implementar */}
                    <Button variant='success' size="sm" title="Próximamente"><LuShoppingCart /> Agregar</Button>
                    <Button variant="dark" size="sm" onClick={() => verDetalle(producto.id)}>
                      Ver más
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GrillaProductos;
