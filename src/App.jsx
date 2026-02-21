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
function App() {

  return (
    <>
      <BrowserRouter>
      <Menu></Menu>
      <DetalleProducto></DetalleProducto>
      <Routes>
        <Route path='/' element={<Inicio></Inicio>} />
        <Route path='/productos' element={<FormProducto></FormProducto>} />
        <Route path='/listadoDeProductos' element={<ListadoDeProductos></ListadoDeProductos>} />
        <Route path='/login' element={<LoginYRegistro></LoginYRegistro>} />
      </Routes>
      <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App
