import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import {defineConfig} from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        viteCompression({algorithm: 'brotliCompress', verbose: false}),
        viteCompression({algorithm: 'gzip', verbose: false}),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    preview: {
        allowedHosts: ['entity-minecraft.dasred.de'],
    },
});
