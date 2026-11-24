import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './Components/shared/Menu'
import Inicio from './Components/Inicio/Inicio'
import FormProducto from './Components/Productos/FormProducto'
import Footer from './Components/shared/Footer'
import LoginYRegistro from './Components/Usuarios/LoginYRegistro'
import DetalleProducto from './Components/Productos/DetalleProducto'
import RutaProtegida from './Components/RutasProtegidas/RutaProtegida'
import PaginaNoEncontrada from './Components/shared/PaginaNoEncontrada'
import BotonWhatsApp from './Components/shared/BotonWhatsapp'
import Configuraciones from './Components/Usuarios/Config/Configuraciones'
import { UserContext } from './Context/Usuarios/UserContext'
import Catalogo from './Components/Productos/Catalogo'
import Mayorista from './Components/Inicio/Mayorista'

function App() {
  const { configWhatsapp } = useContext(UserContext)

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/catalogo' element={<Catalogo />} />
        <Route path='/mayorista' element={<Mayorista />} />
        <Route path='/productos/:id' element={<DetalleProducto />} />
        <Route path='/login' element={<LoginYRegistro />} />

        {/* Panel de gestión: solo usuarios logueados */}
        <Route element={<RutaProtegida />}>
          <Route path='/productos' element={<FormProducto />} />
          <Route path='/config' element={<Configuraciones />} />
        </Route>

        <Route path='*' element={<PaginaNoEncontrada />} />
      </Routes>
      <BotonWhatsApp telefono={configWhatsapp?.telefono} mensaje={configWhatsapp?.mensaje} />
      <Footer />
    </BrowserRouter>
  )
}

export default App
