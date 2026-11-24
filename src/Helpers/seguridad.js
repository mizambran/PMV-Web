// Utilidades de usuarios para la demo (sin backend).
// IMPORTANTE: todo lo que corre en el navegador es visible para cualquiera.
// Esto evita guardar contraseñas en texto plano, pero un login real
// necesita validar las credenciales en un servidor.

export const normalizarEmail = (email = "") => email.trim().toLowerCase();

// Hash SHA-256 en hexadecimal usando la Web Crypto API del navegador.
export const hashearContraseña = async (contraseña = "") => {
  const datos = new TextEncoder().encode(contraseña);
  const hash = await crypto.subtle.digest("SHA-256", datos);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

// Datos que se guardan como sesión: nunca la contraseña ni su hash.
export const datosDeSesion = (usuario) =>
  usuario
    ? {
        id: usuario.id,
        nombreEmpresa: usuario.nombreEmpresa,
        emailUsuario: usuario.emailUsuario,
        rol: usuario.rol || "empresa",
      }
    : null;
