import { Navbar, Container, Nav, NavDropdown, Badge, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaUserCircle } from 'react-icons/fa'; // Necesitarás instalar react-icons
import { Link } from 'react-router-dom';
import { LuStar } from 'react-icons/lu';
import { useContext } from 'react';
import { UserContext } from '../../Context/Usuarios/UserContext';


const Menu = () => {

  const {logueado, setLogueado} = useContext(UserContext)


  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand as={Link} to={'/'} className="fw-bold">
          PMV <span className="text-primary">Web</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <NavLink as={Link} to={'/'} className={'nav-link'} >Inicio</NavLink>
          {logueado && (
            
            <div>

            <NavDropdown title={<span>Productos</span>}>
                <NavDropdown.Item as={Link} to={'/productos'}>ABM</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={'/listadoDeProductos'}>Listado</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span>Clientes</span>}>
                <NavDropdown.Item as={Link}>ABM</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link}>Listado</NavDropdown.Item>
            </NavDropdown>
            <NavLink as={Link} to={'/nosotros'} className={'nav-link'} >Nosotros</NavLink>
            </div>
          
          )}
          </Nav>

          {logueado? (
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
                  Miguel Angel 
                </span>
              } 
              id="user-nav-dropdown" 
              align="end"
            >
              <NavDropdown.Item href="#perfil">Mi Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#config">Configuración</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout" className="text-danger">
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          ) : (
            <Button type='button' as={Link} to={'/login'} variant='outline-light' > <FaUser /> Iniciar Sesión</Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Menu
