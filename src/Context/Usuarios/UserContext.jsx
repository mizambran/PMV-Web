import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // 1. Usuarios registrados (leemos de localStorage si existe)
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem("usuarios_pmv");
    return guardados ? JSON.parse(guardados) : [];
  });

  // 2. Estado de sesión
  const [logueado, setLogueado] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [registrado, setRegistrado] = useState(true);

  // 3. Configuración global de WhatsApp
  const [configWhatsapp, setConfigWhatsapp] = useState(() => {
    const configGuardada = localStorage.getItem("config_whatsapp_pmv");
    return configGuardada
      ? JSON.parse(configGuardada)
      : {
          telefono: "5493810000000",
          mensaje: "¡Hola! Quisiera hacer una consulta sobre los productos.",
          telefonoMayorista:"5493810303456",
          mensajeMayorista:"¡Hola! Quiero ser revendedor."
        };
  });

  // Efectos para persistir cambios automáticamente
  useEffect(() => {
    localStorage.setItem("usuarios_pmv", JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem("config_whatsapp_pmv", JSON.stringify(configWhatsapp));
  }, [configWhatsapp]);

  useEffect(() => {
    const sesion = localStorage.getItem("user_session");
    if (sesion) {
      setUsuarioLogueado(JSON.parse(sesion));
      setLogueado(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        usuarios,
        setUsuarios,
        logueado,
        setLogueado,
        usuarioLogueado,
        setUsuarioLogueado,
        registrado,
        setRegistrado,
        configWhatsapp,
        setConfigWhatsapp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};