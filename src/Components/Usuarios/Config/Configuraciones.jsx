import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Badge,
  Modal,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaWhatsapp, FaEdit, FaTrash, FaSave, FaUsersCog, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { UserContext } from "../../../Context/Usuarios/UserContext"; // Ajustá esta ruta si hace falta
import { usuariosDePrueba } from "../../../db/usuarioDePrueba";

const Configuraciones = () => {

  const { usuarios, setUsuarios, configWhatsapp, setConfigWhatsapp } =
    useContext(UserContext);

 useEffect(() => {
    const usuarioDePrueba = usuariosDePrueba
 setUsuarios(usuarioDePrueba)
 }, [])

  // Estado para controlar el Modal de edición de usuario
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);

  const [editandoWsp, setEditandoWsp] = useState(false)

  // FORMULARIO 1: Configuración de WhatsApp Global
  const {
    register: registerWsp,
    handleSubmit: handleSubmitWsp,
    reset:resetWsp,
    formState: { errors: errorsWsp },
  } = useForm({
    defaultValues: {
      telefono: configWhatsapp?.telefono || "",
      mensaje: configWhatsapp?.mensaje || "",
      telefonoMayorista: configWhatsapp?.telefonoMayorista || "",
      mensajeMayorista: configWhatsapp?.mensajeMayorista || ""
    },
  });


  // FORMULARIO 2: Modal de Edición de Usuario
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setValue: setValueEdit,
    formState: { errors: errorsEdit },
  } = useForm();

  // --- LÓGICA WHATSAPP GLOBAL ---
  const onSubmitWhatsapp = (data) => {
  const nuevaConfig = {
    telefono: data.telefono.trim(),
    mensaje: data.mensaje.trim(),
    telefonoMayorista: data.telefonoMayorista.trim(),
    mensajeMayorista: data.mensajeMayorista.trim(),
  };

  setConfigWhatsapp(nuevaConfig);
  setEditandoWsp(false); // Volvemos a modo lectura

  Swal.fire({
    title: "¡Configuración guardada!",
    text: "Los canales de WhatsApp fueron actualizados.",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  });
};

const cancelarEdicionWsp = () => {
    resetWsp(configWhatsapp);
  setEditandoWsp(false);
};

  // --- LÓGICA TABLA DE USUARIOS ---
  const abrirModalEdicion = (usuario) => {
    setUsuarioAEditar(usuario);
    setValueEdit("nombreEmpresa", usuario.nombreEmpresa || usuario.nombre || "");
    setValueEdit("emailUsuario", usuario.emailUsuario || "");
    setValueEdit("celular", usuario.celular || "");
    // Por defecto asumimos true si la propiedad aún no existe en registros viejos
    setValueEdit("activo", usuario.activo !== undefined ? usuario.activo : true);
    setMostrarModal(true);
  };

  const cerrarModalEdicion = () => {
    setMostrarModal(false);
    setUsuarioAEditar(null);
  };

  const onSubmitEditarUsuario = (data) => {
    const usuariosActualizados = usuarios.map((u) => {
      if (u.id === usuarioAEditar.id) {
        return {
          ...u,
          nombreEmpresa: data.nombreEmpresa.trim(),
          emailUsuario: data.emailUsuario.trim(),
          celular: data.celular.trim(),
          activo: data.activo,
        };
      }
      return u;
    });

    setUsuarios(usuariosActualizados);
    cerrarModalEdicion();

    Swal.fire({
      title: "Usuario actualizado",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const eliminarUsuario = (id, nombre) => {
    Swal.fire({
      title: `¿Eliminar a ${nombre}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const filtrados = usuarios.filter((u) => u.id !== id);
        setUsuarios(filtrados);
        Swal.fire("Eliminado", "El usuario fue dado de baja.", "success");
      }
    });
  };

  const contactarUsuarioWhatsapp = (celular, nombre) => {
    if (!celular) {
      Swal.fire(
        "Sin número",
        "Este usuario no tiene un celular cargado.",
        "info"
      );
      return;
    }
    const numeroLimpio = celular.replace(/\D/g, "");
    // Podemos agregar un texto cuando ellos presionen el botón de wsp en la tabla de usuarios activos
    const texto = encodeURIComponent(
      ``
    );
    window.open(
      `https://wa.me/${numeroLimpio}?text=${texto}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4">
        <FaUsersCog className="me-2 text-primary" />
        Configuración del Sistema
      </h2>

     {/* SECCIÓN 1: CONFIGURACIÓN BOTÓN FLOTANTE DE WHATSAPP */}
<Card className="shadow-sm border-0 rounded-3 mb-5">
  <Card.Header className="bg-dark text-white fw-bold py-3 d-flex justify-content-between align-items-center">
    <div>
      <FaWhatsapp className="me-2 text-success" size={20} />
      Configuración de WhatsApp
    </div>
    {!editandoWsp && (
      <Button
        variant="outline-light"
        size="sm"
        onClick={() => setEditandoWsp(true)}
      >
        <FaEdit className="me-1" /> Editar
      </Button>
    )}
  </Card.Header>

  <Card.Body className="p-4">
    <Form onSubmit={handleSubmitWsp(onSubmitWhatsapp)}>
      {/* FILA 1: CLIENTES MINORISTAS / GENÉRICO */}
      <h6 className="fw-bold text-primary mb-3">
        Atención General
      </h6>
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">
              Número de Teléfono (con código de país)
            </Form.Label>
            <Form.Control
              type="text"
              disabled={!editandoWsp}
              placeholder="Ej: 5493815554433"
              isInvalid={!!errorsWsp.telefono}
              {...registerWsp("telefono", {
                required: "El número general es obligatorio",
                minLength: {
                  value: 10,
                  message: "Mínimo 10 dígitos",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errorsWsp.telefono?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={8}>
          <Form.Group>
            <Form.Label className="fw-semibold">
              Mensaje Predeterminado General
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              disabled={!editandoWsp}
              placeholder="Mensaje para clientes generales..."
              isInvalid={!!errorsWsp.mensaje}
              {...registerWsp("mensaje", {
                required: "El mensaje general no puede estar vacío",
                validate: (v) =>
                  v.trim() !== "" || "No puede contener solo espacios",
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errorsWsp.mensaje?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <hr className="my-4" />

      {/* FILA 2: CLIENTES MAYORISTAS */}
      <h6 className="fw-bold text-success mb-3">
        Atención Exclusiva Mayoristas
      </h6>
      <Row className="g-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold">
              Número Mayorista (con código de país)
            </Form.Label>
            <Form.Control
              type="text"
              disabled={!editandoWsp}
              placeholder="Ej: 5493815559988"
              isInvalid={!!errorsWsp.telefonoMayorista}
              {...registerWsp("telefonoMayorista", {
                required: "El número mayorista es obligatorio",
                minLength: {
                  value: 10,
                  message: "Mínimo 10 dígitos",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errorsWsp.telefonoMayorista?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={8}>
          <Form.Group>
            <Form.Label className="fw-semibold">
              Mensaje Predeterminado Mayoristas
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              disabled={!editandoWsp}
              placeholder="Mensaje para consultas mayoristas..."
              isInvalid={!!errorsWsp.mensajeMayorista}
              {...registerWsp("mensajeMayorista", {
                required: "El mensaje mayorista no puede estar vacío",
                validate: (v) =>
                  v.trim() !== "" || "No puede contener solo espacios",
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errorsWsp.mensajeMayorista?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {/* BOTONES DE ACCIÓN (Solo visibles en modo edición) */}
      {editandoWsp && (
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button
            type="button"
            variant="danger"
            onClick={cancelarEdicionWsp}
          >
            <FaTimes className="me-1" /> Cancelar
          </Button>
          <Button type="submit" variant="success" className="fw-semibold">
            <FaSave className="me-1" /> Guardar
          </Button>
        </div>
      )}
    </Form>
  </Card.Body>
</Card>

      {/* SECCIÓN 2: LISTADO DE USUARIOS ACTIVOS */}
      <Card className="shadow-sm border-0 rounded-3">
        <Card.Header className="bg-white border-bottom py-3">
          <h5 className="mb-0 fw-bold">Usuarios Registrados</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive striped hover className="mb-0 align-middle">
            <thead className="table-dark">
              <tr>
                <th className="ps-3">Usuario / Empresa</th>
                <th>Email</th>
                <th>Celular</th>
                <th className="text-center">Activo</th>
                <th className="text-center">Acciones</th>
                <th className="text-center">Contacto</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((user) => {
                  const nombreMostrar =
                    user.nombreEmpresa || user.nombre || "Sin nombre";
                  const estaActivo =
                    user.activo !== undefined ? user.activo : true;

                  return (
                    <tr key={user.id}>
                      <td className="ps-3 fw-semibold">{nombreMostrar}</td>
                      <td>{user.emailUsuario}</td>
                      <td>{user.celular || <span className="text-muted">No cargado</span>}</td>
                      <td className="text-center">
                        {estaActivo ? (
                          <Badge bg="success">Sí</Badge>
                        ) : (
                          <Badge bg="danger">No</Badge>
                        )}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          {/* Botón Editar */}
                          <Button
                            variant="warning"
                            size="sm"
                            title="Editar usuario"
                            onClick={() => abrirModalEdicion(user)}
                          >
                            <FaEdit />
                          </Button>


                          {/* Botón Borrar */}
                          <Button
                            variant="danger"
                            size="sm"
                            title="Borrar usuario"
                            onClick={() =>
                              eliminarUsuario(user.id, nombreMostrar)
                            }
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                      <td className="text-center" >
                        {/* Botón WhatsApp */}
                          <Button
                            variant="success"
                            size="sm"
                            title="Enviar WhatsApp"
                            onClick={() =>
                              contactarUsuarioWhatsapp(
                                user.celular,
                                nombreMostrar
                              )
                            }
                          >
                            <FaWhatsapp />
                          </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No hay usuarios registrados todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* MODAL DE EDICIÓN DE USUARIO */}
      <Modal show={mostrarModal} onHide={cerrarModalEdicion} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitEdit(onSubmitEditarUsuario)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Usuario / Nombre Empresa</Form.Label>
              <Form.Control
                type="text"
                isInvalid={!!errorsEdit.nombreEmpresa}
                {...registerEdit("nombreEmpresa", {
                  required: "Este campo es obligatorio",
                  validate: (v) => v.trim() !== "" || "No puede estar vacío",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errorsEdit.nombreEmpresa?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                isInvalid={!!errorsEdit.emailUsuario}
                {...registerEdit("emailUsuario", {
                  required: "El email es obligatorio",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errorsEdit.emailUsuario?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: 549381..."
                isInvalid={!!errorsEdit.celular}
                {...registerEdit("celular", {
                  required: "El celular es obligatorio",
                  validate: (v) => v.trim() !== "" || "No puede estar vacío",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errorsEdit.celular?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Check
                type="switch"
                id="switch-usuario-activo"
                label="Usuario Activo"
                {...registerEdit("activo")}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={cerrarModalEdicion}>
              <FaTimes /> Cancelar
            </Button>
            <Button variant="success" type="submit">
              <FaSave /> Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Configuraciones;