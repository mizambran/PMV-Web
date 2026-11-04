import { useContext } from "react";
import { ProductContext } from "../../Context/Productos/ProductContentx";
import {  Button, Carousel, Row, Col, Badge } from "react-bootstrap";
import { LuShoppingCart } from "react-icons/lu";
import { MdPayment } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { convertirPrecio } from "../../Helpers/calculos";

const DetalleProducto = () => {
  const {
    productos,
    ofertaActiva
  } = useContext(ProductContext);

  const { id } = useParams()

  const productoBuscado = productos.find((producto) => producto.id === id)

  const navegacion = useNavigate()

  const volverAtras = () => {
    navegacion(-1)
  }

  return (
    <>
      <div className="my-5">
        <div>
            <div className="container py-4">
            <Row>
              <Col lg={7}>
                {/* Carrusel de Imágenes */}
                <Carousel variant="dark" className="shadow-sm bg-white rounded">
                  {[productoBuscado?.imagenUno, productoBuscado?.imagenDos, productoBuscado?.imagenTres]
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
                <h1 className="fw-bold">{productoBuscado?.nombre}</h1>
                <h2 className="text-primary my-3 fw-bold">
                  {convertirPrecio(productoBuscado?.precio || 0)}
                </h2>
                <hr />
                <h5>Descripción</h5>
                <p className="text-muted">{productoBuscado?.descripcion}</p>
                <h5 className="mt-4">Características</h5>
                <div className="bg-white p-3 rounded border">{productoBuscado?.caracteristicas
                ?.split("\n")
                .filter((linea) => linea.trim() !== "") // Quito lineas vacias
                .map((linea, index) => (
                  <ul key={index} className="text-muted" >
                    <li> {linea.trim()} </li>
                  </ul>
                ))
                }</div>
                <Button variant='success' size="md"  ><LuShoppingCart /> Agregar al carrito</Button>
                <Button variant='warning' size="md" className="ms-3" ><MdPayment></MdPayment> Comprar</Button>
                <Button variant="secondary" onClick={volverAtras} >  Atras </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={5} className="mt-5" >
              <div>
                <h2>Formas de pago</h2>
                <ul className="mt-4" >
                  <li>Tarjeta Naranja</li>
                  <li>Visa Crédito / Débito</li>
                  <li>Mercado Pago</li>
                </ul>
                <p>Consulta planes de financiación propia!</p>
                <Button variant="success" >Whatsapp</Button>
              </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalleProducto;
