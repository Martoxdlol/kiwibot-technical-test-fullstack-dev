import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        testTimeout: 30000,
        setupFiles: ['dotenv/config'],
    },
    // path alias ~/
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './')
        },
    },
})