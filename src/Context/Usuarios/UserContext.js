import { createContext } from "react";

// El contexto vive en su propio archivo para que Fast Refresh funcione
// (los archivos .jsx de componentes solo deben exportar componentes).
export const UserContext = createContext(null);
