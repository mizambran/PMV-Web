import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Usuarios/UserContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { hashearContraseña, normalizarEmail } from "../../Helpers/seguridad";

const LoginYRegistro = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const [verContraseña, setVerContraseña] = useState(false);

  const toggleVerContraseña = () => {
    setVerContraseña(!verContraseña);
  };

  const {
    usuarios,
    setUsuarios,
    registrado,
    setRegistrado,
    logueado,
    setUsuarioLogueado,
  } = useContext(UserContext);

  const toggleRegistrado = () => {
    setRegistrado(!registrado);
    reset();
  };

  const navigate = useNavigate();

  const iniciarSesion = async (data) => {
    const email = normalizarEmail(data.emailUsuario);

    // 1. Usuario administrador de DEMO definido en .env.
    //    OJO: las variables VITE_ quedan visibles en el JavaScript publicado,
    //    así que esto sirve solo para demostraciones, nunca como seguridad real.
    const emailAdmin = normalizarEmail(import.meta.env.VITE_API_USUARIO || "");
    const contraseñaAdmin = import.meta.env.VITE_API_PASSWORD || "";
    if (emailAdmin && contraseñaAdmin && email === emailAdmin && data.contraseñaUsuario === contraseñaAdmin) {
      setUsuarioLogueado({ id: "admin", nombreEmpresa: "Administrador", emailUsuario: email, rol: "admin" });
      Swal.fire("¡Bienvenido Administrador!", "Ingresaste con credenciales de demo.", "success");
      navigate("/productos");
      return;
    }

    // 2. Usuarios registrados: se compara el hash de la contraseña.
    const hash = await hashearContraseña(data.contraseñaUsuario);
    const usuarioEncontrado = usuarios.find((usuario) => {
      if (normalizarEmail(usuario.emailUsuario) !== email) return false;
      // Compatibilidad con usuarios guardados por la versión anterior (contraseña en texto plano)
      return usuario.contraseñaHash ? usuario.contraseñaHash === hash : usuario.contraseñaUsuario === data.contraseñaUsuario;
    });

    if (!usuarioEncontrado) {
      Swal.fire("Credenciales incorrectas", "Revisá el email y la contraseña.", "error");
      return;
    }

    // Si era un usuario viejo, se migra a contraseña hasheada y se borra el texto plano.
    if (!usuarioEncontrado.contraseñaHash) {
      setUsuarios((actuales) =>
        actuales.map((usuario) => {
          if (usuario.id !== usuarioEncontrado.id) return usuario;
          // eslint-disable-next-line no-unused-vars
          const { contraseñaUsuario, ...resto } = usuario;
          return { ...resto, contraseñaHash: hash };
        })
      );
    }

    setUsuarioLogueado(usuarioEncontrado);
    Swal.fire(`¡Bienvenido ${usuarioEncontrado.nombreEmpresa}!`, "¡Preparate para generar muchas ventas!", "success");
    navigate("/productos");
  };

  const registrarUsuario = async (data) => {
    const email = normalizarEmail(data.emailUsuario);
    const emailAdmin = normalizarEmail(import.meta.env.VITE_API_USUARIO || "");

    if (email === emailAdmin || usuarios.some((usuario) => normalizarEmail(usuario.emailUsuario) === email)) {
      Swal.fire("Ese email ya está registrado", "Iniciá sesión o usá otro email.", "warning");
      return;
    }

    const nuevoUsuario = {
      id: uuidv4(),
      nombreEmpresa: data.nombreEmpresa.trim(),
      emailUsuario: email,
      contraseñaHash: await hashearContraseña(data.contraseñaUsuario),
      rol: "empresa",
    };

    setUsuarios((actuales) => [...actuales, nuevoUsuario]);
    reset();
    setUsuarioLogueado(nuevoUsuario);

    Swal.fire({ title: "¡Registro Correcto!", text: "¡Que comiencen las ventas!", icon: "success" });
    navigate("/productos");
  };

  const onSubmit = async (data) => {
    try {
      if (registrado) await iniciarSesion(data);
      else await registrarUsuario(data);
    } catch {
      // crypto.subtle solo existe en contextos seguros (https o localhost)
      Swal.fire("No se pudo procesar", "Abrí la página desde https o localhost e intentá de nuevo.", "error");
    }
  };

  useEffect(() => {
    if (logueado) {
      navigate('/productos', { replace: true });
    }
  }, [logueado, navigate]);

  return (
    <Container
      className="d-flex justify-content-center align-items-center py-5"
      style={{ minHeight: "80vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={5}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-5">
              {registrado ? (
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2">¡Bienvenido! 😉</h2>
                  <p className="text-muted">
                    Completá con tus credenciales para ingresar
                  </p>
                </div>
              ) : (
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2">
                    <FaUser /> Crear Cuenta{" "}
                  </h2>
                  <p className="text-muted">Completá tus datos para empezar</p>
                </div>
              )}

              <Form onSubmit={handleSubmit(onSubmit)}>
                {!registrado && (
                  <Form.Group className="mb-3">
                    <Form.Label>Empresa</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaUser className="text-muted" />
                      </span>
                      <Form.Control
                        type="text"
                        placeholder="Ej: Soluciones Tecno"
                        className="border-start-0"
                        {...register("nombreEmpresa", {
                          required: "Este campo es obligatorio",
                        })}
                      />
                    </div>
                    {errors.nombreEmpresa && (
                      <Form.Text className="text-danger">
                        {errors.nombreEmpresa.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FaEnvelope className="text-muted" />
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="nombre@ejemplo.com"
                      className="border-start-0"
                      {...register("emailUsuario", {
                        required: "El email es obligatorio"
                      })}
                    />
                  </div>
                  {errors.emailUsuario && (
                    <Form.Text className="text-danger">
                      {errors.emailUsuario.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FaLock className="text-muted" />
                    </span>
                    <Form.Control
                      type={verContraseña ? "text" : "password"}
                      placeholder="********"
                      className="border-start-0"
                      {...register("contraseñaUsuario", {
                        required: "La contraseña es obligatoria",
                        ...(registrado ? {} : { minLength: { value: 6, message: "Mínimo 6 caracteres" } }),
                      })}
                    />
                    <button
                      type="button"
                      onClick={toggleVerContraseña}
                      aria-label={verContraseña ? "Ocultar contraseña" : "Mostrar contraseña"}
                      style={{
                        border: "transparent",
                        backgroundColor: "transparent",
                      }}
                      className="input-group-text bg-white"
                    >
                      {verContraseña ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.contraseñaUsuario && (
                    <Form.Text className="text-danger">
                      {errors.contraseñaUsuario.message}
                    </Form.Text>
                  )}
                </Form.Group>

                {!registrado && (
                  <Form.Group className="mb-4" controlId="formConfirmPassword">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <Form.Control
                        type={verContraseña ? "text" : "password"}
                        placeholder="Repetir contraseña"
                        className="border-start-0"
                        {...register("confirmarContraseña", {
                          validate: (value) => 
                            value === getValues("contraseñaUsuario") || "Las contraseñas no coinciden"
                        })}
                      />
                      <button
                        type="button"
                        onClick={toggleVerContraseña}
                        style={{
                          border: "transparent",
                          backgroundColor: "transparent",
                        }}
                        className="input-group-text bg-white"
                      >
                        {verContraseña ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmarContraseña && (
                      <Form.Text className="text-danger">
                        {errors.confirmarContraseña.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                )}

                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="shadow-sm"
                    disabled={isSubmitting}
                  >
                    {registrado ? "Iniciar Sesión" : "Registrarme"}
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    {registrado ? "¿Aun no tenes cuenta?" : "¿Ya tenés cuenta?"}
                    <Button
                      type="button"
                      variant="outline-light"
                      className="text-primary fw-bold ms-2"
                      onClick={toggleRegistrado}
                    >
                      {registrado ? "Crear cuenta" : "Iniciar Sesión"}
                    </Button>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginYRegistro;