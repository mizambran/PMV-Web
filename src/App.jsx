import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './Components/shared/Menu'
import Inicio from './Components/Inicio/Inicio'
import FormProducto from './Components/Productos/FormProducto'
import ListadoDeProductos from './Components/Productos/ListadoDeProductos'
import Footer from './Components/shared/Footer'
import LoginYRegistro from './Components/Usuarios/LoginYRegistro'
import DetalleProducto from './Components/Productos/DetalleProducto'
import RutaProtegida from './Components/RutasProtegidas/RutaProtegida'
import BotonWhatsApp from './Components/shared/BotonWhatsapp'
import { useContext } from 'react'
import { UserContext } from './Context/Usuarios/UserContext'
import Configuraciones from './Components/Usuarios/Config/Configuraciones'
function App() {


  const {configWhatsapp} = useContext(UserContext)

  return (
    <>
      <BrowserRouter>
      <Menu></Menu>
      <Routes>
        <Route path='/' element={<Inicio></Inicio>} />
        <Route element={<RutaProtegida />}>
          <Route path='/productos' element={<FormProducto></FormProducto>} />
          <Route path='/listadoDeProductos' element={<ListadoDeProductos></ListadoDeProductos>} />
          <Route path='/config' element={<Configuraciones />} />
        </Route>
        <Route path='/:id' element={<DetalleProducto />} />
        <Route path='/productos/:id' element={<DetalleProducto />} />
        <Route path='/login' element={<LoginYRegistro></LoginYRegistro>} />
        <Route path='*' element={<p>Error 404</p>} />
      </Routes>
      <BotonWhatsApp telefono={configWhatsapp.telefono} mensaje={configWhatsapp.mensaje} />
      <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App
