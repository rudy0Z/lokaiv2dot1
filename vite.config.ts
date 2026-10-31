import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' + hash routing keeps the build embeddable anywhere (v1 lesson).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
