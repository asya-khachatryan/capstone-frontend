import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  
  resolve: {
    alias: {
      "@api": "/src/api",
      "@components": "/src/components",
      "@redux": "/src/redux",
      "@pages": "/src/pages",
      "@hooks": "/src/hooks",
    },
  },
})