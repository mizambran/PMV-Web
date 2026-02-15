import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaEyeSlash, FaEye, } from 'react-icons/fa'; // O FaEye según tu estado inicial
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/Usuarios/UserContext';
import { useForm } from 'react-hook-form';

const LoginYRegistro = () => {

  const {register, handleSubmit, reset, formState:{errors}, setValue, getValues} = useForm()

  const [verContraseña, setVerContraseña] = useState(false)

  const toggleVerContraseña = () => {
    setVerContraseña(!verContraseña)
  }

  const {registrado, setRegistrado, logueado, setLogueado, ingresoPermitido} = useContext(UserContext)

  const toggleRegistrado = () => {
    setRegistrado(!registrado)
    reset();
  }

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '80vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={5}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-5">
              
              
              {registrado? (
                <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">Bienvenido! 😉</h2>
                <p className="text-muted">Completá con tus credenciales para ingresar</p>
              </div>
              ) : (
                <div className="text-center mb-4">
                <h2 className="fw-bold mb-2"><FaUser /> Crear Cuenta </h2>
                <p className="text-muted">Completá tus datos para empezar</p>
              </div>
              )}
  
              <Form>
                
                {!registrado && (
                  <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FaUser className="text-muted" />
                    </span>
                    <Form.Control 
                      type="text" 
                      placeholder="Ej: Miguel" 
                      className="border-start-0"
                      {...register("nombre", {
                        required:"Este campo es obligatorio"
                      })} 
                    />
                  </div>
                  <Form.Text className='text-danger'> {errors.nombre?.message} </Form.Text>
                </Form.Group>
                )}

                {/* 2. CAMPO EMAIL (Siempre visible) */}
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
                       
                    />
                  </div>
                </Form.Group>

                {/* 3. CAMPO CONTRASEÑA (Siempre visible) */}
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FaLock className="text-muted" />
                    </span>
                    <Form.Control 
                      type={verContraseña? "text" : "password"} 
                      placeholder="********" 
                      className="border-start-0" 
                    />
                    {/* Botón visual para el ojo (sin lógica) */}
                       <button type='button' onClick={toggleVerContraseña} style={{border:"transparent", backgroundColor:"transparent"}}>
                        {verContraseña? <FaEyeSlash /> : <FaEye /> }
                        </button>
                  </div>
                </Form.Group>

                
                {!registrado && (
                  <Form.Group className="mb-4" controlId="formConfirmPassword">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FaLock className="text-muted" />
                    </span>
                    <Form.Control 
                      type={verContraseña? "text" : "password"} 
                      placeholder="Repetir contraseña" 
                      className="border-start-0" 
                    />
                    {/* Botón visual para el ojo (sin lógica) */}
                       <button type='button' onClick={toggleVerContraseña} style={{border:"transparent", backgroundColor:"transparent"}}>
                        {verContraseña? <FaEyeSlash /> : <FaEye /> }
                        </button>
                  </div>
                </Form.Group>
                )}

                {/* Botón Principal */}
                <div className="d-grid gap-2">
                  <Button type='submit' variant="primary"  size="lg" className="shadow-sm">
                    {registrado? "Iniciar Sesión" : "Registrarme"}
                  </Button>
                </div>

                {/* Separador */}
                <div className="text-center my-3 text-muted small">O ingresá con</div>

                {/* Botón Social */}
                <div className="d-grid gap-2 mb-4">
                  <Button variant="outline-danger" size="lg">
                    <FaGoogle className="me-2" /> Google
                  </Button>
                </div>

                {/* Link para cambiar de modo */}
                <div className="text-center mt-4">
                  <p className="mb-0">
                    {registrado? "¿Aun no tenes cuenta?" : "¿Ya tenés cuenta?"}
                    <Button type='button' variant='outline-light' className="text-primary fw-bold ms-2" onClick={toggleRegistrado} >
                      {registrado? "Crear cuenta" : "Iniciar Sesión"} 
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