// URL pública compartida por el build, el router y los metadatos.
export const siteUrl = 'https://poketiempo.mx/'
export const siteBase = new URL(siteUrl).pathname
export const siteRoutes = ['/', '/media-kit', '/tienda', '/tests', '/test'] as const
export type SiteRoute = typeof siteRoutes[number] | `/test/resultado/${string}`
export const contactEmail = 'shamed.tiempo@gmail.com'

export function absoluteUrl(path = '') {
  return new URL(path.replace(/^\//, ''), siteUrl).href
}

export function pageUrl(path: SiteRoute) {
  return absoluteUrl(path === '/' ? '' : `${path.slice(1)}/`)
}

