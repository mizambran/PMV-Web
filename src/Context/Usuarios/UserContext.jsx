import { createContext, useEffect, useState } from "react";



export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuariosPMV")) || []
    const [usuarios, setUsuarios] = useState(usuariosLocalStorage)

    const [registrado , setRegistrado] = useState(true)

    const [logueado, setLogueado] = useState(false);

    const ingresoPermitido = (correoRecibido, contraseñaRecibida) => {
        if(correoRecibido === correo && contraseñaRecibida === contraseña){
            setLogueado(!logueado)
        }
    }

    const [usuarioLogueado, setUsuarioLogueado] = useState(null)


        useEffect(() => {
        localStorage.setItem("usuariosPMV", JSON.stringify(usuarios))
    }, [usuarios])

    useEffect(() => {
        const sessionGuardada = JSON.parse(localStorage.getItem('user_session'));  // para mantenerse logueado

        if(sessionGuardada){
        // si existe el usuaario, lo transformamos en objeto
        const user = JSON.stringify(sessionGuardada);
        setUsuarioLogueado(user);
        setLogueado(true)
        }
    }, [])

    return(
        <UserContext.Provider value={{
            usuarios,
            setUsuarios,
            registrado,
            setRegistrado,
            logueado,
            setLogueado,
            ingresoPermitido,
            usuarioLogueado,
            setUsuarioLogueado
             }}>
            {children}
        </UserContext.Provider>
    )
}