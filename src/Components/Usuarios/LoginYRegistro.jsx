import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Usuarios/UserContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const LoginYRegistro = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
    setLogueado,
    setUsuarioLogueado,
  } = useContext(UserContext);

  const toggleRegistrado = () => {
    setRegistrado(!registrado);
    reset();
  };

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (registrado) {
      // 1. Verificamos primero si son las credenciales del .env
      const esAdminEnv =
        data.emailUsuario === import.meta.env.VITE_API_USUARIO &&
        data.contraseñaUsuario === import.meta.env.VITE_API_PASSWORD;

      if (esAdminEnv) {
        const usuarioAdmin = {
          id: "admin",
          nombreEmpresa: "Administrador",
          emailUsuario: data.emailUsuario,
        };
        setLogueado(true);
        setUsuarioLogueado(usuarioAdmin);
        localStorage.setItem("user_session", JSON.stringify(usuarioAdmin));
        
        Swal.fire(
          "¡Bienvenido Administrador!",
          "Ingresaste con credenciales de demo.",
          "success"
        );
        navigate("/productos");
        return; // Cortamos la ejecución acá para que no siga buscando
      }

      // 2. Si no es admin, buscamos en el array de usuarios del context
      const usuarioEncontrado = usuarios.find((usuario) => {
        return (
          usuario.emailUsuario === data.emailUsuario &&
          usuario.contraseñaUsuario === data.contraseñaUsuario
        );
      });

      if (usuarioEncontrado) {
        setLogueado(true);
        setUsuarioLogueado(usuarioEncontrado);
        localStorage.setItem("user_session", JSON.stringify(usuarioEncontrado));
        
        Swal.fire(
          `¡Bienvenido ${usuarioEncontrado.nombreEmpresa}!`,
          "¡Preparate para generar muchas ventas!",
          "success"
        );
        navigate("/productos");
      } else {
        Swal.fire("Credenciales incorrectas", "", "error");
      }
    } else {
      // Lógica de Registro
      const nuevoUsuario = {
        id: uuidv4(),
        nombreEmpresa: data.nombreEmpresa,
        emailUsuario: data.emailUsuario,
        contraseñaUsuario: data.contraseñaUsuario,
      };

      setUsuarios([...usuarios, nuevoUsuario]);
      reset();
      
      setLogueado(true);
      setUsuarioLogueado(nuevoUsuario);
      localStorage.setItem("user_session", JSON.stringify(nuevoUsuario));

      Swal.fire({
        title: "¡Registro Correcto!",
        text: "¡Que comiencen las ventas!",
        icon: "success",
      });
      
      navigate("/productos");
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
                        required: "La contraseña es obligatoria"
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
                  >
                    {registrado ? "Iniciar Sesión" : "Registrarme"}
                  </Button>
                </div>

                <div className="text-center my-3 text-muted small">
                  O ingresá con
                </div>

                <div className="d-grid gap-2 mb-4">
                  <Button variant="outline-danger" size="lg">
                    <FaGoogle className="me-2" /> Google
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