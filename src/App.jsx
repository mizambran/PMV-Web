import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './Components/shared/Menu'
import Inicio from './Components/Inicio/Inicio'
import GrillaProductos from './Components/Inicio/GrillaProductos'
import FormProducto from './Components/Productos/FormProducto'
import Footer from './Components/shared/Footer'
import LoginYRegistro from './Components/Usuarios/LoginYRegistro'
import DetalleProducto from './Components/Productos/DetalleProducto'
import RutaProtegida from './Components/RutasProtegidas/RutaProtegida'
import PaginaNoEncontrada from './Components/shared/PaginaNoEncontrada'

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/catalogo' element={<GrillaProductos />} />
        <Route path='/productos/:id' element={<DetalleProducto />} />
        <Route path='/login' element={<LoginYRegistro />} />

        {/* Panel de gestión: solo usuarios logueados */}
        <Route element={<RutaProtegida />}>
          <Route path='/productos' element={<FormProducto />} />
        </Route>

        <Route path='*' element={<PaginaNoEncontrada />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
