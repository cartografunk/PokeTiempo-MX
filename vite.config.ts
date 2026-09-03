import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Base explicito (no relativo) para que coincida con el basename del router.
// GitHub Pages (repo actual): '/PokeTiempo-MX/'
// Cuando se mude a dominio propio en raiz: cambiar solo esta linea a '/'
export default defineConfig({
  base: '/PokeTiempo-MX/',
  plugins: [react()],
})
