import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import compression from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        compression(),
    ],
    server: {
        port: 3000,
        // proxy: {
        //     '/v2': 'https://pokeapi.co/api',
        // }
    },
})
