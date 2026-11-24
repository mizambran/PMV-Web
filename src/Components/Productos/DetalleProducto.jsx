import { useContext, useEffect } from "react";
import { ProductContext } from "../../Context/Productos/ProductContext";
import { UserContext } from "../../Context/Usuarios/UserContext";
import { Button, Carousel, Row, Col, Badge, Card } from "react-bootstrap";
import { LuShoppingCart } from "react-icons/lu";
import { MdPayment } from "react-icons/md";
import { FaCreditCard, FaMoneyBillWave, FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { convertirPrecio } from "../../Helpers/calculos";
import { IMAGEN_PLACEHOLDER, imagenesDelProducto } from "../../Helpers/imagenes";

const WHATSAPP_POR_DEFECTO = "5493816096533";

const DetalleProducto = () => {
  const { productos } = useContext(ProductContext);
  const { configWhatsapp } = useContext(UserContext);
  const telefonoWhatsapp = (configWhatsapp?.telefono || WHATSAPP_POR_DEFECTO).replace(/\D/g, "");
  const { id } = useParams();
  const navegacion = useNavigate();

  // Scroll automático hacia arriba al entrar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const productoBuscado = productos.find((p) => p.id === id);
  const volverAtras = () => navegacion(-1);

  // Filtrar hasta 3 productos de la misma categoría excluyendo el actual
  const productosRelacionados = productos
    .filter(p => p.categoria === productoBuscado?.categoria && p.id !== id)
    .slice(0, 3);

  if (!productoBuscado) {
    return (
      <div className="text-center my-5 py-5">
        <h2>Producto no encontrado</h2>
        <Button variant="primary" className="mt-3" onClick={() => navegacion("/catalogo")}>Ver catálogo</Button>
      </div>
    );
  }

  const linkWhatsApp = `https://wa.me/${telefonoWhatsapp}?text=${encodeURIComponent(
    `Hola! Quiero consultar por "${productoBuscado.nombre}" (${convertirPrecio(productoBuscado.precio)}) y los planes de financiación.`
  )}`;

  return (
    <div className="container py-5">
      {/* Botón Volver mejorado */}
      <Button variant="link" className="text-decoration-none text-muted mb-4 p-0 d-flex align-items-center" onClick={volverAtras}>
        <FaArrowLeft className="me-2" /> Volver al listado
      </Button>

      <Row className="g-5">
        <Col lg={7}>
          <Carousel variant="dark" className="shadow-sm bg-white rounded border">
            {imagenesDelProducto(productoBuscado).map((img, index) => (
              <Carousel.Item key={index} style={{ height: '500px' }}>
                <img
                  className="d-block w-100 h-100"
                  src={img}
                  alt={`${productoBuscado.nombre} - imagen ${index + 1}`}
                  onError={(e) => { e.currentTarget.src = IMAGEN_PLACEHOLDER; }}
                  style={{ objectFit: 'contain', padding: '2rem' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        
        <Col lg={5}>
          {productoBuscado.ofertaActiva && <Badge bg="warning" text="dark" className="mb-3 px-3 py-2 fs-6 rounded-pill shadow-sm">¡Oferta Especial!</Badge>}
          <h1 className="fw-bold mb-3">{productoBuscado.nombre}</h1>
          <h2 className="text-primary mb-4 fw-bold display-6">
            {convertirPrecio(productoBuscado.precio)}
          </h2>
          
          <p className="text-muted fs-5 mb-4">{productoBuscado.descripcion}</p>
          
          <div className="bg-light p-4 rounded-3 border mb-4">
            <h5 className="fw-bold mb-3">Características principales</h5>
            <ul className="text-muted mb-0 ps-3">
              {productoBuscado.caracteristicas?.split("\n").filter((linea) => linea.trim() !== "").map((linea, index) => (
                <li key={index} className="mb-2">{linea.trim()}</li>
              ))}
            </ul>
          </div>

          {/* Botones de acción mejorados */}
          <div className="d-grid gap-3 d-md-flex">
            <Button variant="success" size="lg" className="rounded-pill px-4 shadow-sm flex-grow-1 d-flex align-items-center justify-content-center">
              <LuShoppingCart className="me-2 fs-5" /> Agregar al carrito
            </Button>
            <Button variant="primary" size="lg" className="rounded-pill px-4 shadow-sm flex-grow-1 d-flex align-items-center justify-content-center">
              <MdPayment className="me-2 fs-5" /> Comprar ahora
            </Button>
          </div>
        </Col>
      </Row>

      {/* Sección Formas de Pago mejorada */}
      <Row className="mt-5 pt-4 border-top">
        <Col lg={12}>
          <h3 className="fw-bold mb-4">Formas de pago</h3>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 bg-light shadow-sm text-center p-3">
                <Card.Body>
                  <FaCreditCard className="text-primary mb-3" size={40} />
                  <Card.Title>Tarjetas de Crédito</Card.Title>
                  <Card.Text className="text-muted small">Visa, MasterCard y Tarjeta Naranja.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 bg-light shadow-sm text-center p-3">
                <Card.Body>
                  <FaMoneyBillWave className="text-success mb-3" size={40} />
                  <Card.Title>Mercado Pago</Card.Title>
                  <Card.Text className="text-muted small">Transferencias y dinero en cuenta.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 bg-light shadow-sm text-center p-3 d-flex flex-column justify-content-center align-items-center">
                <Card.Text className="text-muted mb-3">¡Consultá por nuestros planes de financiación propia!</Card.Text>
                <Button as="a" href={linkWhatsApp} target="_blank" rel="noopener noreferrer" variant="success" className="rounded-pill px-4 shadow-sm">
                  <FaWhatsapp className="me-2" /> Consultar por WhatsApp
                </Button>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Productos Relacionados */}
      {productosRelacionados.length > 0 && (
        <Row className="mt-5 pt-5 border-top">
          <Col lg={12}>
            <h3 className="fw-bold mb-4">Productos Relacionados</h3>
            <Row xs={1} md={3} className="g-4">
              {productosRelacionados.map((prod) => (
                <Col key={prod.id}>
                  <Card className="h-100 border-0 shadow-sm cursor-pointer" onClick={() => navegacion(`/productos/${prod.id}`)} style={{cursor: 'pointer'}}>
                    <div style={{ height: "200px", padding: "1rem" }}>
                      <Card.Img
                        variant="top"
                        src={prod.imagenUno || IMAGEN_PLACEHOLDER}
                        alt={prod.nombre}
                        onError={(e) => { e.currentTarget.src = IMAGEN_PLACEHOLDER; }}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>
                    <Card.Body className="text-center border-top">
                      <Card.Title className="fs-6 text-truncate">{prod.nombre}</Card.Title>
                      <Card.Text className="fw-bold text-primary">{convertirPrecio(prod.precio)}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DetalleProducto;