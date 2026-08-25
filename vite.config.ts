import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No GitHub Pages o site fica em /quiz-ia-pro/, então o build precisa
// dessa base. Em desenvolvimento continua na raiz.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/quiz-ia-pro/' : '/',
  plugins: [react()],
  server: { host: true, port: 5273 },
}))
