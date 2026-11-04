import { useContext } from "react"
import { UserContext } from "../../Context/Usuarios/UserContext"
import { Navigate, Outlet } from "react-router-dom";


const RutaProtegida = () => {
  
  const {logueado} = useContext(UserContext);

  // Si no esta logueado lo manda al inicio
  if(!logueado) {
    return <Navigate to={'/'} replace />
  }
  
    // si esta logueado le muestra todo
    return <Outlet />
}

export default RutaProtegida
