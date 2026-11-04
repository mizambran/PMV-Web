export const convertirPrecio = (precio) => {
    const resultado = precio.toLocaleString('es-AR', {style:'currency', currency:'ARS'})
    return resultado
}