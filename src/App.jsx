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
function App() {

  return (
    <>
      <BrowserRouter>
      <Menu></Menu>
      <DetalleProducto></DetalleProducto>
      <Routes>
        <Route path='/' element={<Inicio></Inicio>} />
        <Route element={<RutaProtegida />}>
          <Route path='/productos' element={<FormProducto></FormProducto>} />
          <Route path='/listadoDeProductos' element={<ListadoDeProductos></ListadoDeProductos>} />
        </Route>
        <Route path='/login' element={<LoginYRegistro></LoginYRegistro>} />
      </Routes>
      <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App
