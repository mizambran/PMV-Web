import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PaginaNoEncontrada = () => {
  return (
    <Container className="text-center py-5 my-5">
      <p className="display-1 fw-bold text-primary mb-0">404</p>
      <h2 className="fw-bold mb-3">Página no encontrada</h2>
      <p className="text-muted mb-4">La dirección que buscás no existe o fue movida.</p>
      <div className="d-flex justify-content-center gap-2">
        <Button as={Link} to="/" variant="primary">Ir al inicio</Button>
        <Button as={Link} to="/catalogo" variant="outline-primary">Ver catálogo</Button>
      </div>
    </Container>
  );
};

export default PaginaNoEncontrada;
