// Cambiar únicamente cuando el dominio propio esté comprado y configurado.
export const siteUrl = 'https://cartografunk.github.io/PokeTiempo-MX/'
export const siteBase = new URL(siteUrl).pathname
export const siteRoutes = ['/', '/media-kit', '/tienda', '/tests', '/test'] as const
export type SiteRoute = typeof siteRoutes[number] | `/test/resultado/${string}`
export function absoluteUrl(path = '') {
  return new URL(path.replace(/^\//, ''), siteUrl).href
}
export function pageUrl(path: SiteRoute) {
  return absoluteUrl(path === '/' ? '' : `${path.slice(1)}/`)
}
