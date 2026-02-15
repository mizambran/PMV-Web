import { createContext, useEffect, useState } from "react";



export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuariosPMV")) || []
    const [usuarios, setUsuarios] = useState({correo:"demo@gmail.com", contraseña:"1234"})

    useEffect(() => {
        localStorage.setItem("usuariosPMV", JSON.stringify(usuarios))
    }, [usuarios])

    const [registrado , setRegistrado] = useState(true)

    const [logueado, setLogueado] = useState(false);

    const ingresoPermitido = (correoRecibido, contraseñaRecibida) => {
        if(correoRecibido === correo && contraseñaRecibida === contraseña){
            setLogueado(!logueado)
        }
    }

    const crearUsuario = (data) => {
        
    }


    return(
        <UserContext.Provider value={{
            usuarios,
            setUsuarios,
            registrado,
            setRegistrado,
            logueado,
            setLogueado,
            ingresoPermitido
             }}>
            {children}
        </UserContext.Provider>
    )
}