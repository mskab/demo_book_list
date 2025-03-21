import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
    }), 
    tailwindcss(),
  ],
  server: {
    port: 3001,
    hmr: false,
  },
})
