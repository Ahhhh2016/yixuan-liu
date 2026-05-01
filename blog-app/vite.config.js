import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// GitHub project pages need base `/repo/`; user site repo `<user>.github.io` uses `/`.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE ?? '/',
})
