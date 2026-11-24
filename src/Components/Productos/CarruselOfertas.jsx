import { useContext } from 'react';
import { Container, Carousel, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { LuShoppingCart } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../Context/Productos/ProductContext';
import { convertirPrecio } from '../../Helpers/calculos';
import { IMAGEN_PLACEHOLDER } from '../../Helpers/imagenes';

const CarruselOfertas = () => {
  const { productos } = useContext(ProductContext);
  const navegacion = useNavigate();

  const verDetalle = (id) => {
    navegacion(`/productos/${id}`);
  };

  // Filtramos solo los que tienen ofertaActiva en true
  const productosEnOferta = productos.filter((prod) => prod.ofertaActiva === true);

  if (productosEnOferta.length === 0) return null;

  // Agrupamos de a 3 productos por diapositiva del carrusel
  const gruposDeTres = [];
  for (let i = 0; i < productosEnOferta.length; i += 3) {
    gruposDeTres.push(productosEnOferta.slice(i, i + 3));
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4 fw-bold text-center">Ofertas Destacadas</h2>
      <hr />

      <Carousel variant="dark" indicators={gruposDeTres.length > 1}>
        {gruposDeTres.map((grupo, idx) => (
          <Carousel.Item key={idx} className="pb-5 px-md-5">
            <Row xs={1} md={2} lg={3} className="g-4 mt-1 justify-content-center">
              {grupo.map((producto) => (
                <Col key={producto.id}>
                  <Card className="h-100 border-0" style={{ boxShadow: "0px 0px 8px #777373" }}>
                    <div style={{ height: '150px', overflow: 'hidden', position: 'relative' }}>
                      <Card.Img
                        variant="top"
                        src={producto.imagenUno || IMAGEN_PLACEHOLDER}
                        alt={producto.nombre}
                        onError={(e) => { e.currentTarget.src = IMAGEN_PLACEHOLDER; }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          backgroundColor: '#fff',
                          padding: '0.75rem',
                        }}
                      />
                      <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">
                        Oferta
                      </Badge>
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
                          <Button variant="success" size="sm" title="Próximamente">
                            <LuShoppingCart /> Agregar
                          </Button>
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
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default CarruselOfertas;