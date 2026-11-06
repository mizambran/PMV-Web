import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    // 1. Leemos el localStorage ANTES de inicializar los estados
    const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuariosPMV")) || [];
    const sessionGuardada = JSON.parse(localStorage.getItem('user_session'));

    const [usuarios, setUsuarios] = useState(usuariosLocalStorage);
    const [registrado, setRegistrado] = useState(true);
    
    // 2. Inicializamos los estados directamente con el valor de la sesión
    // Si hay sesión, logueado arranca en true. Si no, en false.
    const [logueado, setLogueado] = useState(sessionGuardada ? true : false);
    const [usuarioLogueado, setUsuarioLogueado] = useState(sessionGuardada || null);

    // Guardamos los usuarios nuevos cuando se registran
    useEffect(() => {
        localStorage.setItem("usuariosPMV", JSON.stringify(usuarios))
    }, [usuarios])

    // (Eliminamos el useEffect que cargaba la sesión porque ya lo hacemos sincrónicamente arriba)

    return(
        <UserContext.Provider value={{
            usuarios,
            setUsuarios,
            registrado,
            setRegistrado,
            logueado,
            setLogueado,
            usuarioLogueado,
            setUsuarioLogueado
        }}>
            {children}
        </UserContext.Provider>
    )
}