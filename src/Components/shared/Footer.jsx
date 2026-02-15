import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          {/* Columna 1: Información de la marca */}
          <Col md={4} className="mb-4">
            <h5 className="fw-bold text-uppercase">PMV <span className="text-primary">Web</span></h5>
            <p className="small text-secondary">
              Tu tienda online de confianza. Encontrá los mejores productos al mejor precio y con la seguridad que merecés.
            </p>
          </Col>

          {/* Columna 2: Enlaces Rápidos */}
          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-secondary">Inicio</Link>
              </li>
              <li className="mb-2">
                <Link to="/listadoDeProductos" className="text-decoration-none text-secondary">Productos</Link>
              </li>
              <li className="mb-2">
                <Link to="/nosotros" className="text-decoration-none text-secondary">Sobre Nosotros</Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="text-decoration-none text-secondary">Contacto</Link>
              </li>
            </ul>
          </Col>

          {/* Columna 3: Información de Contacto */}
          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">Contacto</h5>
            <ul className="list-unstyled text-secondary small">
              <li className="mb-2">
                <FaMapMarkerAlt className="me-2 text-primary" /> Tucumán, Argentina
              </li>
              <li className="mb-2">
                <FaPhone className="me-2 text-primary" /> +54 9 381 609 6533
              </li>
              <li className="mb-2">
                <FaEnvelope className="me-2 text-primary" /> contacto@pmvweb.com
              </li>
            </ul>
            
            {/* Redes Sociales */}
            <div className="mt-4">
              <a href="#" className="text-light me-3"><FaFacebook size={24} /></a>
              <a href="#" className="text-light me-3"><FaInstagram size={24} /></a>
              <a href="#" className="text-light"><FaTwitter size={24} /></a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary" />

        {/* Copyright */}
        <Row>
          <Col className="text-center small text-secondary">
            &copy; {new Date().getFullYear()} PMV Web. Todos los derechos reservados.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;