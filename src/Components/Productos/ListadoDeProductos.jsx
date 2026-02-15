import { useContext } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { ProductContext } from '../../Context/Productos/ProductContentx';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';

const ListadoDeProductos = () => {

  const {productosFiltrados, eliminarProducto} = useContext(ProductContext)

  return (
    <Container className="my-2">
      <h2 className="mb-4 fw-bold text-center">Listado de Productos</h2>
      <hr />
      
      {/* xs={1} (1 col en celu), md={2} (2 cols en tablet), lg={3} (3 cols en PC) */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
          <Col key={producto.id}>
            <Card className="h-100 shadow-sm border-0">
              {/* Imagen  */}
              <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                <Card.Img 
                  variant="top" 
                  src={producto.imagen || "https://placehold.co/600x400?text=Producto+Demo"} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
                <Badge bg='transparent' className="position-absolute top-0 start-0 m-2">
                  <Button variant='success' className='me-2'><FaEye /></Button>
                  <Button variant='warning' className='me-2' ><FaPen /> </Button>
                  <Button variant='danger' onClick={() => eliminarProducto(producto.id, producto.nombre)} ><FaTrash /></Button>
                </Badge>

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
                  <span className="fs-5 fw-bold text-primary">
                    {producto.precio.toLocaleString('es-AR', {style:"currency", currency:"ARS"})}
                  </span>
                  <Button variant="dark" size="sm">
                    Ver más
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
        ) : (<h3 className='text-center fw-bold w-100 p-3'>No hay productos para mostrar.</h3>)}
      </Row>
    </Container>
  )
}

export default ListadoDeProductos
