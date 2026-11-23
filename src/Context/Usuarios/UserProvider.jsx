import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { guardarLocalStorage, leerLocalStorage } from "../../Helpers/almacenamiento";
import { datosDeSesion } from "../../Helpers/seguridad";

export const UserProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = leerLocalStorage("usuariosPMV", []);
    return Array.isArray(guardados) ? guardados : [];
  });
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
    guardarLocalStorage("usuariosPMV", usuarios);
  }, [usuarios]);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
