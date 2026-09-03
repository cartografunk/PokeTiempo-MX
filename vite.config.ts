import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const devRoutes = new Set([
  '/PokeTiempo-MX',
  '/PokeTiempo-MX/media-kit',
  '/PokeTiempo-MX/tienda',
  '/PokeTiempo-MX/test',
])

const useSourceIndexInDev = (): Plugin => ({
  name: 'use-source-index-in-dev',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const pathname = (req.url ?? '/').split(/[?#]/)[0].replace(/\/$/, '')

      if (!devRoutes.has(pathname)) {
        next()
        return
      }

      const sourceIndex = readFileSync(resolve(process.cwd(), 'index.source.html'), 'utf8')
      const html = await server.transformIndexHtml(req.url ?? '/', sourceIndex)

      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(html)
    })
  },
})

// https://vite.dev/config/
// Base explicito (no relativo) para que coincida con el basename del router.
// GitHub Pages (repo actual): '/PokeTiempo-MX/'
// Cuando se mude a dominio propio en raiz: cambiar solo esta linea a '/'
export default defineConfig({
  base: '/PokeTiempo-MX/',
  plugins: [useSourceIndexInDev(), react()],
})
