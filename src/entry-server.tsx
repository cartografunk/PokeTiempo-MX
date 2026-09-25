import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './App'
import { siteBase } from './siteConfig'

export function render(path: string) {
  // React 19 hoists metadata into head when rendering a complete document.
  const html = renderToString(
    <html lang="es-MX">
      <head />
      <body>
        <HelmetProvider>
          <StaticRouter basename={siteBase} location={`${siteBase}${path.replace(/^\//, '')}`}>
            <Layout />
          </StaticRouter>
        </HelmetProvider>
      </body>
    </html>,
  )
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1]
  const body = html.match(/<body>([\s\S]*?)<\/body>/)?.[1]
  if (!head || !body) throw new Error(`No se pudo generar la página ${path}`)
  return { body, head }
}
