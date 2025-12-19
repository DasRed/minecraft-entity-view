import tailwindcss from '@tailwindcss/vite';
import {tanstackRouter} from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import {defineConfig} from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        tanstackRouter({
            target:            'react',
            autoCodeSplitting: true,
            semicolons: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
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
