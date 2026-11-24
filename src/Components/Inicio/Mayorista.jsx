import React, { useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  FaWhatsapp,
  FaCheckCircle,
  FaStore,
  FaStar,
  FaPaperPlane,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { UserContext } from "../../Context/Usuarios/UserContext"; // Ajustá la ruta según la carpeta donde lo guardes

const Mayorista = () => {
  const { configWhatsapp, usuarioLogueado } = useContext(UserContext);

  const nombreMarca = usuarioLogueado?.nombreEmpresa || "PMV Web";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitMayorista = (data) => {
    const telefonoDestino =
      configWhatsapp?.telefonoMayorista || configWhatsapp?.telefono;

    if (!telefonoDestino) {
      Swal.fire(
        "Canal no disponible",
        "Todavía no hay un número mayorista configurado en el sistema.",
        "warning"
      );
      return;
    }

    const numeroLimpio = telefonoDestino.replace(/\D/g, "");
    const saludoInicial =
      configWhatsapp?.mensajeMayorista ||
      `¡Hola! Quisiera postularme como revendedor mayorista de ${nombreMarca}.`;

    // Armamos el mensaje estructurado con los datos del formulario
    let textoMensaje = `${saludoInicial}\n\n`;
    textoMensaje += `*Datos de la solicitud:*\n`;
    textoMensaje += `• *Empresa / Comercio:* ${data.empresa.trim()}\n`;
    textoMensaje += `• *Nombre de contacto:* ${data.nombrePersona.trim()}\n`;
    textoMensaje += `• *Celular:* ${data.celular.trim()}\n`;
    textoMensaje += `• *Email:* ${data.email.trim()}\n`;

    if (data.adicional && data.adicional.trim() !== "") {
      textoMensaje += `• *Comentario adicional:* ${data.adicional.trim()}`;
    }

    const mensajeCodificado = encodeURIComponent(textoMensaje);
    const url = `https://wa.me/${numeroLimpio}?text=${mensajeCodificado}`;

    window.open(url, "_blank", "noopener,noreferrer");
    reset();
  };

  return (
    <Container className="py-5">
      {/* 1. ENCABEZADO / HERO */}
      <div className="text-center mb-5">
        {/* <Badge bg="primary" className="px-3 py-2 mb-2 text-uppercase">
          Programa Mayorista
        </Badge> */}
        <h1 className="fw-bold display-6 mt-2">
          <FaStar className="text-warning me-2 mb-1" />
          ¿Querés ser revendedor oficial?
        </h1>
        <p className="text-muted mx-auto" style={{ maxWidth: "680px" }}>
          Si tenés un comercio, tienda online o emprendimiento y querés sumar
          productos de alta rotación a tu negocio, completá la solicitud para
          acceder a listas de precios exclusivas.
        </p>
      </div>

      {/* 2. CÓMO FUNCIONA Y BENEFICIOS (Bloque oscuro estilo referencia) */}
      <Card className="bg-dark text-white border-0 rounded-4 shadow-sm mb-5">
        <Card.Body className="p-4 p-md-5">
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <h3 className="fw-bold mb-3">¿Cómo funciona?</h3>
              <ol className="ps-3 mb-0 lh-lg text-light">
                <li className="mb-2">
                  <strong>Completá el formulario</strong> de esta página y
                  envianos tu solicitud directa por WhatsApp.
                </li>
                <li className="mb-2">
                  <strong>Evaluamos tu comercio</strong> para validar tu zona y
                  rubro.
                </li>
                <li>
                  <strong>Activamos tu cuenta mayorista</strong> para que
                  compres con precios diferenciales.
                </li>
              </ol>
            </Col>

            <Col lg={6}>
              <div className="p-4 rounded-3 bg-secondary bg-opacity-25 border border-secondary">
                <h6 className="text-uppercase text-warning fw-bold mb-3">
                  Beneficios Exclusivos
                </h6>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2 d-flex align-items-center">
                    <FaCheckCircle className="text-warning me-2 flex-shrink-0" />
                    <span>Precios mayoristas oficiales y descuentos por volumen</span>
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <FaCheckCircle className="text-warning me-2 flex-shrink-0" />
                    <span>Acceso completo al catálogo de productos disponibles</span>
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <FaCheckCircle className="text-warning me-2 flex-shrink-0" />
                    <span>Atención personalizada directa por WhatsApp</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <FaCheckCircle className="text-warning me-2 flex-shrink-0" />
                    <span>Prioridad en reposición y nuevos lanzamientos</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* 3. REQUISITOS */}
      <div className="mb-5">
        <h3 className="fw-bold text-uppercase mb-2">Requisitos</h3>
        <p className="text-muted mb-4">
          Para formar parte de nuestra red de revendedores te pedimos cumplir
          con los siguientes puntos:
        </p>

        <Row className="g-3">
          <Col md={4}>
            <Card className="h-100 border-0 bg-light rounded-3 shadow-sm">
              <Card.Body className="p-4">
                <small className="text-uppercase text-muted fw-bold d-block mb-2">
                  Requisito 1
                </small>
                <p className="mb-0 fs-6">
                  Contar con un <strong>punto de venta físico o digital</strong>{" "}
                  activo.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 bg-light rounded-3 shadow-sm">
              <Card.Body className="p-4">
                <small className="text-uppercase text-muted fw-bold d-block mb-2">
                  Requisito 2
                </small>
                <p className="mb-0 fs-6">
                  Cumplir con un <strong>pedido mínimo inicial</strong> o
                  reposición periódica.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 bg-light rounded-3 shadow-sm">
              <Card.Body className="p-4">
                <small className="text-uppercase text-muted fw-bold d-block mb-2">
                  Requisito 3
                </small>
                <p className="mb-0 fs-6">
                  Representar la marca <strong>con compromiso y profesionalismo</strong>.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* 4. FORMULARIO DE SOLICITUD MAYORISTA */}
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow rounded-4">
            <Card.Header className="bg-dark text-white py-3 px-4 rounded-top-4">
              <h5 className="mb-0 fw-bold d-flex align-items-center">
                <FaStore className="me-2 text-primary" />
                Completá tus datos para postularte
              </h5>
            </Card.Header>

            <Card.Body className="p-4 p-md-5">
              <Form onSubmit={handleSubmit(onSubmitMayorista)}>
                <Row className="g-3">
                  {/* Empresa */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">
                        Empresa / Comercio *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ej: Distribuidora del Norte"
                        isInvalid={!!errors.empresa}
                        {...register("empresa", {
                          required: "El nombre de la empresa es obligatorio",
                          validate: (v) =>
                            v.trim() !== "" || "No puede estar vacío",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.empresa?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {/* Nombre Persona */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">
                        Nombre y Apellido *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ej: Juan Pérez"
                        isInvalid={!!errors.nombrePersona}
                        {...register("nombrePersona", {
                          required: "Tu nombre es obligatorio",
                          validate: (v) =>
                            v.trim() !== "" || "No puede estar vacío",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombrePersona?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {/* Celular */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Celular *</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Ej: 381 555-4433"
                        isInvalid={!!errors.celular}
                        {...register("celular", {
                          required: "El celular es obligatorio",
                          minLength: {
                            value: 8,
                            message: "Ingresá un número de contacto válido",
                          },
                          validate: (v) =>
                            v.trim() !== "" || "No puede estar vacío",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.celular?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {/* Email */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Email *</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="contacto@tuempresa.com"
                        isInvalid={!!errors.email}
                        {...register("email", {
                          required: "El email es obligatorio",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingresá un formato de email válido",
                          },
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {/* Textarea opcional */}
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">
                        Información adicional{" "}
                        <span className="text-muted fw-normal">(Opcional)</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Contanos en qué ciudad estás, qué rubro trabajás o qué productos te interesan..."
                        {...register("adicional")}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Botón enviar WhatsApp */}
                <div className="d-grid mt-4">
                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    className="fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaWhatsapp size={22} />
                    Enviar solicitud
                    {/* <FaPaperPlane size={14} className="ms-1" /> */}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Mayorista;