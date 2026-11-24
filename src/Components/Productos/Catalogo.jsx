import { useContext, useState, useMemo } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Badge,
  InputGroup,
} from 'react-bootstrap';
import { LuShoppingCart } from 'react-icons/lu';
import { FaSearch, FaFilter, FaUndo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../Context/Productos/ProductContext';
import { convertirPrecio } from '../../Helpers/calculos';
import { IMAGEN_PLACEHOLDER } from '../../Helpers/imagenes';

const Catalogo = () => {
  const { productos } = useContext(ProductContext);
  const navegacion = useNavigate();

  // Estados de filtros
  const [busqueda, setBusqueda] = useState('');
  const [categoriasSel, setCategoriasSel] = useState([]);
  const [variantesSel, setVariantesSel] = useState([]);
  const [precioDesde, setPrecioDesde] = useState('');
  const [precioHasta, setPrecioHasta] = useState('');
  const [soloOfertas, setSoloOfertas] = useState(false);
  const [orden, setOrden] = useState('relevancia');

  const verDetalle = (id) => {
    navegacion(`/productos/${id}`);
  };

  // Extraemos categorías únicas dinámicamente de tus productos
  const categoriasDisponibles = useMemo(() => {
    const unicas = new Set(productos.map((p) => p.categoria).filter(Boolean));
    return Array.from(unicas);
  }, [productos]);

  // Extraemos variantes únicas (si tus productos tienen propiedad 'variante')
  const variantesDisponibles = useMemo(() => {
    const unicas = new Set(productos.map((p) => p.variante).filter(Boolean));
    return Array.from(unicas);
  }, [productos]);

  const toggleSeleccion = (valor, listaActual, setLista) => {
    if (listaActual.includes(valor)) {
      setLista(listaActual.filter((item) => item !== valor));
    } else {
      setLista([...listaActual, valor]);
    }
  };

  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoriasSel([]);
    setVariantesSel([]);
    setPrecioDesde('');
    setPrecioHasta('');
    setSoloOfertas(false);
    setOrden('relevancia');
  };

  // Filtrado y ordenamiento combinado
  const productosFiltrados = useMemo(() => {
    const resultado = productos.filter((prod) => {
      const texto = busqueda.toLowerCase().trim();
      const coincideTexto =
        !texto ||
        prod.nombre?.toLowerCase().includes(texto) ||
        prod.descripcion?.toLowerCase().includes(texto);

      const coincideCategoria =
        categoriasSel.length === 0 || categoriasSel.includes(prod.categoria);

      const coincideVariante =
        variantesSel.length === 0 || variantesSel.includes(prod.variante);

      const precioNum = Number(prod.precio);
      const coincideDesde =
        precioDesde === '' || precioNum >= Number(precioDesde);
      const coincideHasta =
        precioHasta === '' || precioNum <= Number(precioHasta);

      const coincideOferta = !soloOfertas || prod.ofertaActiva === true;

      return (
        coincideTexto &&
        coincideCategoria &&
        coincideVariante &&
        coincideDesde &&
        coincideHasta &&
        coincideOferta
      );
    });

    if (orden === 'menorPrecio') {
      return [...resultado].sort((a, b) => Number(a.precio) - Number(b.precio));
    }
    if (orden === 'mayorPrecio') {
      return [...resultado].sort((a, b) => Number(b.precio) - Number(a.precio));
    }
    if (orden === 'az') {
      return [...resultado].sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    return resultado;
  }, [
    productos,
    busqueda,
    categoriasSel,
    variantesSel,
    precioDesde,
    precioHasta,
    soloOfertas,
    orden,
  ]);

  return (
    <Container className="my-5">
      {/* Encabezado: Título, Buscador y Ordenamiento */}
      <Row className="align-items-center mb-4 g-3">
        <Col md={4}>
          <h2 className="fw-bold mb-0">Catálogo</h2>
          <small className="text-muted">
            Mostrando {productosFiltrados.length} de {productos.length} productos
          </small>
        </Col>

        <Col md={5}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <FaSearch className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col md={3}>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small text-nowrap">Ordenar por:</span>
            <Form.Select
              size="sm"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="relevancia">Más relevantes</option>
              <option value="menorPrecio">Menor precio</option>
              <option value="mayorPrecio">Mayor precio</option>
              <option value="az">Alfabéticamente (A-Z)</option>
            </Form.Select>
          </div>
        </Col>
      </Row>

      <hr className="mb-4" />

      <Row>
        {/* PANEL LATERAL DE FILTROS */}
        <Col md={3} className="mb-4">
          <Card className="border-0 p-3" style={{ boxShadow: '0px 0px 8px #d4d4d4' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0 fs-6">
                <FaFilter className="me-2 text-primary" />
                Filtrar por
              </h5>
              <Button
                variant="link"
                size="sm"
                className="text-decoration-none p-0 text-muted"
                onClick={limpiarFiltros}
              >
                <FaUndo className="me-1" /> Limpiar
              </Button>
            </div>

            {/* Switch Solo Ofertas */}
            <div className="mb-3 pb-3 border-bottom">
              <Form.Check
                type="switch"
                id="filtro-ofertas"
                label="Solo en Oferta"
                checked={soloOfertas}
                onChange={(e) => setSoloOfertas(e.target.checked)}
              />
            </div>

            {/* Filtro Categorías */}
            {categoriasDisponibles.length > 0 && (
              <div className="mb-3 pb-3 border-bottom">
                <h6 className="fw-bold small text-uppercase text-muted mb-2">
                  Categoría
                </h6>
                {categoriasDisponibles.map((cat) => {
                  const cantidad = productos.filter((p) => p.categoria === cat).length;
                  return (
                    <Form.Check
                      key={cat}
                      type="checkbox"
                      id={`cat-${cat}`}
                      label={`${cat} (${cantidad})`}
                      checked={categoriasSel.includes(cat)}
                      onChange={() =>
                        toggleSeleccion(cat, categoriasSel, setCategoriasSel)
                      }
                      className="small mb-1"
                    />
                  );
                })}
              </div>
            )}

            {/* Filtro Variantes */}
            {variantesDisponibles.length > 0 && (
              <div className="mb-3 pb-3 border-bottom">
                <h6 className="fw-bold small text-uppercase text-muted mb-2">
                  Variante
                </h6>
                {variantesDisponibles.map((variante) => {
                  const cantidad = productos.filter((p) => p.variante === variante).length;
                  return (
                    <Form.Check
                      key={variante}
                      type="checkbox"
                      id={`var-${variante}`}
                      label={`${variante} (${cantidad})`}
                      checked={variantesSel.includes(variante)}
                      onChange={() =>
                        toggleSeleccion(variante, variantesSel, setVariantesSel)
                      }
                      className="small mb-1"
                    />
                  );
                })}
              </div>
            )}

            {/* Filtro Rango de Precio */}
            <div>
              <h6 className="fw-bold small text-uppercase text-muted mb-2">
                Precio
              </h6>
              <Row className="g-2">
                <Col xs={6}>
                  <Form.Label className="small text-muted mb-1">Desde</Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    placeholder="$ 0"
                    value={precioDesde}
                    onChange={(e) => setPrecioDesde(e.target.value)}
                  />
                </Col>
                <Col xs={6}>
                  <Form.Label className="small text-muted mb-1">Hasta</Form.Label>
                  <Form.Control
                    type="number"
                    size="sm"
                    placeholder="$ Máx"
                    value={precioHasta}
                    onChange={(e) => setPrecioHasta(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>

        {/* GRILLA DE PRODUCTOS FILTRADOS */}
        <Col md={9}>
          {productosFiltrados.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {productosFiltrados.map((producto) => (
                <Col key={producto.id}>
                  <Card
                    className="h-100 border-0"
                    style={{ boxShadow: '0px 0px 8px #777373' }}
                  >
                    <div
                      style={{
                        height: '250px',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={producto.imagenUno || IMAGEN_PLACEHOLDER}
                        alt={producto.nombre}
                        onError={(e) => {
                          e.currentTarget.src = IMAGEN_PLACEHOLDER;
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          backgroundColor: '#fff',
                          padding: '0.75rem',
                        }}
                      />
                      {producto.ofertaActiva && (
                        <Badge
                          bg="warning"
                          text="dark"
                          className="position-absolute top-0 end-0 m-2"
                        >
                          Oferta
                        </Badge>
                      )}
                    </div>

                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{producto.nombre}</Card.Title>
                      <Card.Text className="text-muted small">
                        {producto.descripcion}
                      </Card.Text>

                      <div className="mt-auto d-flex flex-wrap justify-content-between align-items-center gap-2">
                        <span className="fs-4 fw-bold text-primary">
                          {convertirPrecio(producto.precio)}
                        </span>
                        <div className="d-flex gap-2">
                          <Button variant="success" size="sm" title="Próximamente">
                            <LuShoppingCart /> Agregar
                          </Button>
                          <Button
                            variant="dark"
                            size="sm"
                            onClick={() => verDetalle(producto.id)}
                          >
                            Ver más
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5 bg-light rounded-3">
              <p className="text-muted mb-2">
                No se encontraron productos con los filtros seleccionados.
              </p>
              <Button variant="outline-primary" size="sm" onClick={limpiarFiltros}>
                Limpiar filtros
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Catalogo;