import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    preview: {
        port: 5174,
    },
    server: {
        port: 5174,
    },
    build: {
        sourcemap: false,
        cssMinify: true,
    },
});
