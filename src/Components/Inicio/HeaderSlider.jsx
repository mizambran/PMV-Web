
import { Carousel, Container, Button } from 'react-bootstrap';

const HeaderSlider = () => {
  return (
    <Carousel fade interval={5000} className="shadow-sm">
      {/* Slide 1 */}
      <Carousel.Item style={{ height: '450px' }}>
        <img
          className="d-block w-100 h-100"
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" 
          alt="Primer Slide"
          style={{ objectFit: 'cover', filter: 'brightness(0.6)' }}
        />
        <Carousel.Caption className="text-start pb-5 mb-5">
          <Container>
            <h2 className="display-4 fw-bold">Bienvenido a PMV Web</h2>
            <p className="fs-5">Crea, gestiona y visualiza tus productos de forma rápida y sencilla.</p>
            <Button variant="primary" size="lg" className="mt-3 px-4 shadow">
              Explorar Catálogo
            </Button>
          </Container>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item style={{ height: '450px' }}>
        <img
          className="d-block w-100 h-100"
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
          alt="Segundo Slide"
          style={{ objectFit: 'cover', filter: 'brightness(0.6)' }}
        />
        <Carousel.Caption className="text-center pb-5 mb-5">
          <h2 className="display-4 fw-bold">Gestioná tu Inventario</h2>
          <p className="fs-5">Herramientas diseñadas para potenciar tu negocio digital.</p>
          <Button variant="outline-light" size="lg" className="mt-3 px-4">
            Crear Producto
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeaderSlider;