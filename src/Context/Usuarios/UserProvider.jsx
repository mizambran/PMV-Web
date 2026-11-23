import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { guardarLocalStorage, leerLocalStorage } from "../../Helpers/almacenamiento";
import { datosDeSesion } from "../../Helpers/seguridad";

const CONFIG_WHATSAPP_INICIAL = {
  telefono: "5493810000000",
  mensaje: "¡Hola! Quisiera hacer una consulta sobre los productos.",
  telefonoMayorista: "5493810303456",
  mensajeMayorista: "¡Hola! Quiero ser revendedor.",
};

export const UserProvider = ({ children }) => {
  // Usuarios registrados. Se lee la clave nueva ("usuarios_pmv") y, si no existe,
  // la de la versión anterior ("usuariosPMV") para no perder cuentas ya creadas.
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = leerLocalStorage("usuarios_pmv", null) ?? leerLocalStorage("usuariosPMV", []);
    return Array.isArray(guardados) ? guardados : [];
  });

  // Configuración global de WhatsApp (se edita desde /config)
  const [configWhatsapp, setConfigWhatsapp] = useState(() => ({
    ...CONFIG_WHATSAPP_INICIAL,
    ...leerLocalStorage("config_whatsapp_pmv", {}),
  }));
  const [registrado, setRegistrado] = useState(true);

  // La sesión se lee una sola vez y se limpia: si una versión anterior
  // guardó la contraseña dentro de la sesión, acá se descarta.
  const [usuarioLogueado, setUsuarioLogueadoEstado] = useState(() =>
    datosDeSesion(leerLocalStorage("user_session", null))
  );
  const logueado = Boolean(usuarioLogueado);

  // Única forma de iniciar o cerrar sesión: solo guarda los datos públicos del usuario.
  const setUsuarioLogueado = (usuario) => setUsuarioLogueadoEstado(datosDeSesion(usuario));

  const cerrarSesion = () => setUsuarioLogueado(null);

  // La sesión en localStorage siempre refleja el estado (y así se reescribe
  // limpia apenas carga la página si había una sesión vieja con contraseña).
  useEffect(() => {
    guardarLocalStorage("user_session", usuarioLogueado);
  }, [usuarioLogueado]);

  useEffect(() => {
    guardarLocalStorage("usuarios_pmv", usuarios);
  }, [usuarios]);

  useEffect(() => {
    guardarLocalStorage("config_whatsapp_pmv", configWhatsapp);
  }, [configWhatsapp]);

  return (
    <UserContext.Provider
      value={{
        usuarios,
        setUsuarios,
        registrado,
        setRegistrado,
        logueado,
        usuarioLogueado,
        setUsuarioLogueado,
        cerrarSesion,
        configWhatsapp,
        setConfigWhatsapp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
