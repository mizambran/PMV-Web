import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            // Visual Studio bloquea los archivos de .vs y hacía caer el servidor (error EBUSY)
            ignored: ['**/.vs/**'],
        },
    },
})