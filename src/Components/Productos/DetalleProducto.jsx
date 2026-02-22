import { useContext } from "react";
import { ProductContext } from "../../Context/Productos/ProductContentx";
import { Modal, Button, Carousel, Row, Col, Badge } from "react-bootstrap";
import { LuShoppingCart } from "react-icons/lu";
import { MdPayment } from "react-icons/md";

const DetalleProducto = () => {
  const {
    productoSeleccionado,
    showVer,
    handleClose,
    ofertaActiva
  } = useContext(ProductContext);

  // Si no hay producto y no estamos editando, no renderizamos nada para evitar errores
  if (!productoSeleccionado) return null;

  return (
    <>
      <Modal show={showVer} onHide={handleClose} size="fullscreen">
        <Modal.Header closeButton bg="dark" variant="dark">
          <Modal.Title className="text-center"> Detalles del producto </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container py-4">
            <Row>
              <Col lg={7}>
                {/* Carrusel de Imágenes */}
                <Carousel variant="dark" className="shadow-sm bg-white rounded">
                  {[productoSeleccionado?.imagenUno, productoSeleccionado?.imagenDos, productoSeleccionado?.imagenTres]
                    .filter(img => img) // Solo mostramos las que existen
                    .map((img, index) => (
                      <Carousel.Item key={index} style={{ height: '500px' }}>
                        <img
                          className="d-block w-100 h-100"
                          src={img}
                          alt={`Imagen ${index + 1}`}
                          style={{ objectFit: 'contain', padding: '20px' }}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </Col>
              
              <Col lg={5} className="mt-4 mt-lg-0">
                <Badge bg="warning" className="mb-2">{ofertaActiva ? (<span className="text-dark">Oferta!</span>) : ""}</Badge>
                <h1 className="fw-bold">{productoSeleccionado?.nombre}</h1>
                <h2 className="text-primary my-3 fw-bold">
                  {productoSeleccionado?.precio.toLocaleString('es-AR', { style: "currency", currency: "ARS" })}
                </h2>
                <hr />
                <h5>Descripción</h5>
                <p className="text-muted">{productoSeleccionado?.descripcion}</p>
                <h5 className="mt-4">Características</h5>
                <p className="bg-white p-3 rounded border">{productoSeleccionado?.caracteristicas
                ?.split("\n")
                .filter((linea) => linea.trim() !== "") // Quito lineas vacias
                .map((linea, index) => (
                  <ul key={index} className="text-muted" >
                    <li> {linea.trim()} </li>
                  </ul>
                ))
                }</p>
                <Button variant='success' size="md"  ><LuShoppingCart /> Agregar al carrito</Button>
                <Button variant='warning' size="md" className="ms-3" ><MdPayment></MdPayment> Comprar</Button>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DetalleProducto;
