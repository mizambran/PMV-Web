// Lectura segura de localStorage: si el dato no existe, está corrupto
// o el navegador bloquea el acceso, devuelve el valor por defecto
// en lugar de romper toda la aplicación.
export const leerLocalStorage = (clave, valorPorDefecto) => {
  try {
    const valor = JSON.parse(localStorage.getItem(clave));
    return valor ?? valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
};

export const guardarLocalStorage = (clave, valor) => {
  try {
    if (valor === null || valor === undefined) {
      localStorage.removeItem(clave);
    } else {
      localStorage.setItem(clave, JSON.stringify(valor));
    }
  } catch {
    // Sin espacio o almacenamiento bloqueado: la app sigue funcionando en memoria.
  }
};
