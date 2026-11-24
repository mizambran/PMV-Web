# PMV Web

Aplicación web hecha con **React + Vite + React Bootstrap** para publicar y gestionar un catálogo de productos.

## Funcionalidades

- **Inicio y catálogo público** (`/`, `/catalogo`) con detalle de cada producto (`/productos/:id`).
- **Registro e inicio de sesión** (`/login`).
- **Panel de gestión de productos** (`/productos`, requiere sesión): alta, edición, baja, filtros, vista grilla/tabla, **importar y exportar a Excel**.
- Consulta por **WhatsApp** desde el detalle del producto.

## Cómo correrlo

```bash
npm install
cp .env.example .env   # y completar los valores
npm run dev
```

Otros comandos: `npm run build` (compila a `dist/`), `npm run preview` (sirve el build), `npm run lint`.

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `VITE_API_USUARIO` | Email del administrador de demo |
| `VITE_API_PASSWORD` | Contraseña del administrador de demo |

> ⚠️ **Importante:** todas las variables que empiezan con `VITE_` quedan **visibles** dentro del JavaScript publicado. Sirven para una demo, pero **no protegen nada**. El archivo `.env` real no se sube al repositorio (está en `.gitignore`); en el hosting (por ejemplo Netlify) se cargan en la configuración del sitio.

## Limitaciones actuales (sin backend)

- Productos, usuarios y sesión se guardan en el `localStorage` del navegador: cada navegador tiene sus propios datos.
- Las contraseñas se guardan hasheadas (SHA-256), pero un login seguro de verdad necesita un servidor.
- El carrito y los favoritos todavía no están implementados.

## Estructura

```
src/
├── Components/
│   ├── Inicio/            # Slider, sección informativa y grilla del catálogo
│   ├── Productos/         # ABM (FormProducto), listado y detalle
│   ├── RutasProtegidas/   # Redirige a /login si no hay sesión
│   ├── Usuarios/          # Login y registro
│   └── shared/            # Menú, footer y página 404
├── Context/               # Contextos (Productos, Usuarios) y sus providers
└── Helpers/               # Formato de precios, imágenes, localStorage y seguridad
```

## Deploy

`public/_redirects` hace que el hosting (Netlify) devuelva `index.html` en cualquier ruta, para que recargar la página no dé error 404.
