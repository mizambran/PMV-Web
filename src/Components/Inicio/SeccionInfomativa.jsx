import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTruck, FaCreditCard, FaLock, FaUndoAlt } from 'react-icons/fa';

const SeccionInformativa = () => {
  return (
    <Container className="my-5 py-4 border-bottom border-top">
      <Row className="text-center g-4">
        {/* Envíos */}
        <Col xs={6} md={3}>
          <div className="p-2">
            <div className="text-primary mb-2">
              <FaTruck size={30} />
            </div>
            <h6 className="fw-bold mb-1">Envíos a todo el país</h6>
            <p className="text-muted small">Recibí tu compra en tu puerta.</p>
          </div>
        </Col>

        {/* Pagos */}
        <Col xs={6} md={3}>
          <div className="p-2">
            <div className="text-primary mb-2">
              <FaCreditCard size={30} />
            </div>
            <h6 className="fw-bold mb-1">Todos los medios de pago</h6>
            <p className="text-muted small">Cuotas sin interés con tarjetas.</p>
          </div>
        </Col>

        {/* Seguridad */}
        <Col xs={6} md={3}>
          <div className="p-2">
            <div className="text-primary mb-2">
              <FaLock size={30} />
            </div>
            <h6 className="fw-bold mb-1">Compra 100% segura</h6>
            <p className="text-muted small">Protegemos todos tus datos.</p>
          </div>
        </Col>

        {/* Devoluciones */}
        <Col xs={6} md={3}>
          <div className="p-2">
            <div className="text-primary mb-2">
              <FaUndoAlt size={30} />
            </div>
            <h6 className="fw-bold mb-1">Cambio garantizado</h6>
            <p className="text-muted small">30 días para devoluciones gratis.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SeccionInformativa;