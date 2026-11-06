import { Navbar, Container, Nav, NavDropdown, Badge, Button } from 'react-bootstrap';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaUserCircle } from 'react-icons/fa'; 
import { LuStar } from 'react-icons/lu';
import { useContext } from 'react';
import { UserContext } from '../../Context/Usuarios/UserContext';

const Menu = () => {
  const {
    logueado, 
    setLogueado,
    usuarioLogueado,
    setUsuarioLogueado,
    setRegistrado
  } = useContext(UserContext)

  const navigate = useNavigate()

  const handleIrALogin = () => {
    setRegistrado(true); // Asegura que al hacer clic vaya a "Iniciar Sesión" y no a "Crear Cuenta"
    navigate('/login');
  }

  const handleCerrarSesion = () => {
    setLogueado(false);
    setUsuarioLogueado(null);
    localStorage.removeItem("user_session");
    navigate('/');
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand as={Link} to={'/'} className="fw-bold">
          {usuarioLogueado?.nombreEmpresa ? (
            <>
              {usuarioLogueado.nombreEmpresa.split(' ')[0]}
              <span className="text-primary"> {usuarioLogueado.nombreEmpresa.split(' ').slice(1).join(' ')}</span>
            </>
          ) : (
            <>PMV <span className="text-primary">Web</span></>
          )}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={'/'} className={'nav-link'}>Inicio</NavLink>
            {logueado && (
              <>
                <NavDropdown title={<span>Productos</span>}>
                  <NavDropdown.Item as={Link} to={'/productos'}>ABM</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title={<span>Clientes</span>}>
                  <NavDropdown.Item as={Link}>ABM</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>

          {logueado ? (
            <Nav className="align-items-center">
              {/* Favoritos */}
              <Button variant="outline-warning" className="position-relative me-3 border-0">
                <LuStar size={20} />
              </Button>
              {/* Carrito de Compras */}
              <Button variant="outline-info" className="position-relative me-3 border-0">
                <FaShoppingCart size={20} />
                <Badge 
                  pill 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  0
                </Badge>
              </Button>

              {/* Usuario Logueado */}
              <NavDropdown 
                title={
                  <span>
                    <FaUserCircle className="me-1" size={18} />
                    {usuarioLogueado?.nombreEmpresa || "Usuario"} 
                  </span>
                } 
                id="user-nav-dropdown" 
                align="end"
              >
                <NavDropdown.Item href="#perfil">Mi Perfil</NavDropdown.Item>
                <NavDropdown.Item href="#config">Configuración</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleCerrarSesion} className="text-danger">
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Button type='button' onClick={handleIrALogin} variant='outline-light'>
              <FaUser className="me-2" /> Iniciar Sesión
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu