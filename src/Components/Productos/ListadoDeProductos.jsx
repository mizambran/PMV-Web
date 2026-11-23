import { useContext, useRef, useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Table } from "react-bootstrap";
import { ProductContext } from "../../Context/Productos/ProductContext";
import { FaEye, FaPen, FaTrash, FaThLarge, FaList } from "react-icons/fa";
import { LuCloudUpload } from "react-icons/lu";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { convertirPrecio } from "../../Helpers/calculos";
import { IMAGEN_PLACEHOLDER } from "../../Helpers/imagenes";

const CAMPOS_TEXTO = ["nombre", "descripcion", "caracteristicas", "categoria", "imagenUno", "imagenDos", "imagenTres"];

// Convierte una fila de Excel en un producto válido, o null si le faltan datos obligatorios.
const filaAProducto = (fila) => {
  const producto = {};
  CAMPOS_TEXTO.forEach((campo) => {
    producto[campo] = fila[campo] === undefined || fila[campo] === null ? "" : String(fila[campo]).trim();
  });
  const precio = Number(String(fila.precio ?? "").replace(/[^\d.,-]/g, "").replace(",", "."));
  const oferta = String(fila.ofertaActiva ?? "").trim().toLowerCase();

  if (!producto.nombre || !Number.isFinite(precio) || precio < 0) return null;

  return {
    ...producto,
    id: fila.id ? String(fila.id) : "",
    precio,
    ofertaActiva: ["true", "si", "sí", "1", "verdadero"].includes(oferta),
  };
};

const ListadoDeProductos = ({ productosFiltrados = [], handleShowEditar }) => {
  const { productos, eliminarProducto, setProductos } = useContext(ProductContext);
  // Empieza en true para que por defecto sea Grilla
  const [vistaGrilla, setVistaGrilla] = useState(true);
  const inputArchivo = useRef(null);
  const navegacion = useNavigate();

  const cambiarVista = () => setVistaGrilla(!vistaGrilla);
  const verDetalle = (id) => navegacion(`/productos/${id}`);

  // xlsx se carga solo cuando se usa (achica el JavaScript inicial de la página)
  const exportarAExcel = async () => {
    const { utils, writeFile } = await import("xlsx");
    const hojaDeCalculo = utils.json_to_sheet(productosFiltrados);
    const libroDeTrabajo = utils.book_new();
    utils.book_append_sheet(libroDeTrabajo, hojaDeCalculo, "Productos");
    writeFile(libroDeTrabajo, "Productos.xlsx");
  };

  const importarDesdeExcel = async (evento) => {
    const archivo = evento.target.files?.[0];
    evento.target.value = "";
    if (!archivo) return;

    try {
      const { read, utils } = await import("xlsx");
      const libro = read(await archivo.arrayBuffer());
      const filas = utils.sheet_to_json(libro.Sheets[libro.SheetNames[0]], { defval: "" });
      const validos = filas.map(filaAProducto).filter(Boolean);
      const descartados = filas.length - validos.length;

      if (validos.length === 0) {
        Swal.fire("No se importó nada", "El archivo necesita al menos las columnas \"nombre\" y \"precio\" (como el que genera Exportar).", "warning");
        return;
      }

      // Si la fila trae el id de un producto existente, se actualiza; si no, se agrega.
      let nuevos = 0;
      let actualizados = 0;
      const lista = [...productos];
      validos.forEach((producto) => {
        const indice = producto.id ? lista.findIndex((p) => p.id === producto.id) : -1;
        if (indice >= 0) {
          lista[indice] = { ...lista[indice], ...producto };
          actualizados++;
        } else {
          lista.push({ ...producto, id: uuidv4() });
          nuevos++;
        }
      });
      setProductos(lista);

      Swal.fire(
        "Importación terminada",
        `${nuevos} producto(s) nuevos y ${actualizados} actualizados.${descartados ? ` ${descartados} fila(s) descartadas por no tener nombre o precio válido.` : ""}`,
        "success"
      );
    } catch {
      Swal.fire("No se pudo leer el archivo", "Verificá que sea un Excel (.xlsx/.xls) o CSV válido.", "error");
    }
  };

  return (
    <div>
      <div className="mb-4 mt-4 d-flex justify-content-center align-items-center gap-3">
        {/* Botón con ícono para alternar vista */}
        <Button variant="outline-primary" onClick={cambiarVista} title={vistaGrilla ? "Ver como Tabla" : "Ver como Grilla"}>
          {vistaGrilla ? <FaList size={20} /> : <FaThLarge size={20} />}
        </Button>
        <Button variant="warning" onClick={() => inputArchivo.current?.click()}><LuCloudUpload className="me-2" /> Importar</Button>
        <input ref={inputArchivo} type="file" accept=".xlsx,.xls,.csv" hidden onChange={importarDesdeExcel} />
        <Button variant="success" onClick={exportarAExcel} disabled={productosFiltrados.length === 0}><BsFileEarmarkSpreadsheetFill className="me-2" /> Exportar</Button>
      </div>

      {!vistaGrilla ? (
        <div className="container my-5">
          <Table striped bordered hover responsive className="shadow-sm bg-white">
            <thead className="table-dark">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>¿Es Oferta?</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <tr key={producto.id}>
                    <td className="align-middle">{producto.nombre}</td>
                    <td className="align-middle">{convertirPrecio(producto.precio)}</td>
                    <td className="align-middle">{producto.categoria}</td>
                    <td className="align-middle">{producto.ofertaActiva ? "Sí" : "No"}</td>
                    <td className="text-center">
                      <Button variant="success" className="me-2" size="sm" onClick={() => verDetalle(producto.id)} title="Ver Detalle"><FaEye /></Button>
                      <Button variant="warning" className="me-2" size="sm" onClick={() => handleShowEditar?.(producto)} title="Editar"><FaPen /></Button>
                      <Button variant="danger" size="sm" onClick={() => eliminarProducto(producto.id, producto.nombre)} title="Eliminar"><FaTrash /></Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center fw-bold p-4">No hay productos que coincidan con los filtros.</td></tr>
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <Container className="my-2">
          <Row xs={1} md={2} lg={3} className="g-4">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <Col key={producto.id}>
                  <Card className="h-100 border-0 shadow-sm transition-hover">
                    <div style={{ height: "250px", overflow: "hidden", position: "relative" }}>
                      <Card.Img
                        variant="top"
                        src={producto.imagenUno || IMAGEN_PLACEHOLDER}
                        alt={producto.nombre}
                        onError={(e) => { e.currentTarget.src = IMAGEN_PLACEHOLDER; }}
                        style={{ width: "100%", height: "100%", objectFit: "contain", padding: "1.5rem" }}
                      />
                      {producto.categoria && <Badge bg="secondary" className="position-absolute top-0 start-0 m-3">{producto.categoria}</Badge>}
                      {producto.ofertaActiva && <Badge bg="warning" className="position-absolute top-0 end-0 m-3 text-dark">Oferta</Badge>}
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-bold">{producto.nombre}</Card.Title>
                      <Card.Text className="text-muted small text-truncate">{producto.descripcion}</Card.Text>

                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <span className="fs-5 fw-bold text-primary">
                          {convertirPrecio(producto.precio)}
                        </span>
                        <div className="d-flex gap-1">
                          <Button variant="outline-success" size="sm" onClick={() => verDetalle(producto.id)} title="Ver Detalle"><FaEye /></Button>
                          <Button variant="outline-warning" size="sm" onClick={() => handleShowEditar?.(producto)} title="Editar"><FaPen /></Button>
                          <Button variant="outline-danger" size="sm" onClick={() => eliminarProducto(producto.id, producto.nombre)} title="Eliminar"><FaTrash /></Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <h4 className="text-center text-muted w-100 p-5">No hay productos que coincidan con los filtros.</h4>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ListadoDeProductos;
