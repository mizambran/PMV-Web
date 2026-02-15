import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { LuShoppingCart, LuStar } from 'react-icons/lu';
import { ProductContext } from '../../Context/Productos/ProductContentx';
import { FaPlus, FaShoePrints, FaShopify, FaShoppingCart } from 'react-icons/fa';
import { FaShopLock } from 'react-icons/fa6';
import { FiShoppingCart } from 'react-icons/fi';

const GrillaProductos = () => {
  // Estos datos son solo para maquetar. Vos después los traés de tu API/Base de Datos.
  const {productos} = useContext(ProductContext)

  return (
    <Container className="my-5">
      <h2 className="mb-4 fw-bold text-center">Nuestros Productos</h2>
      <hr />
      
      {/* xs={1} (1 col en celu), md={2} (2 cols en tablet), lg={3} (3 cols en PC)*/}
      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        {productos.map((producto) => (
          <Col key={producto.id}>
            <Card className="h-100 border-0" style={{boxShadow:"0px 0px 8px #777373"}}>
              {/* Imagen (Usamos un placeholder por ahora) */}
              <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                <Card.Img 
                  variant="top" 
                  src={producto.imagen} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor:"#fff" }}
                />
                <Badge bg="secondary" className="position-absolute top-0 end-0 m-2">
                  {producto.categoria}
                </Badge>

              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text className="text-muted small">
                  {producto.descripcion}
                </Card.Text>
                
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fs-4 fw-bold text-primary ms-2">
                    {producto.precio.toLocaleString('es-AR', {style:'currency', currency:'ARS'})}
                  </span>
                  <Button variant='success' size="sm" className='ms-4' ><LuShoppingCart /> Agregar</Button>
                  <Button variant="dark" size="sm" className='me-4'>
                    Ver más
                  </Button>
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