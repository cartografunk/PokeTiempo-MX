import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { sharedResults, resultPath } from '../src/data/resultImages.ts'
import { render } from '../dist-ssr/entry-server.js'
import { absoluteUrl, pageUrl, siteRoutes, siteBase } from '../src/siteConfig.ts'

const template = await readFile('dist/index.html', 'utf8')
for (const route of [...siteRoutes, ...sharedResults.map(item => resultPath(item.winners))]) {
  const { body, head } = render(route)
  const html = template.replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('</head>', `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  const directory = route === '/' ? 'dist' : `dist${route}`
  await mkdir(directory, { recursive: true })
  await writeFile(`${directory}/index.html`, html)
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${siteRoutes.map(route => `  <url><loc>${pageUrl(route)}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile('dist/sitemap.xml', sitemap)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('sitemap.xml')}\n`)
await writeFile('dist/404.html', `<!doctype html><html lang="es-MX"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Página no encontrada | Poketiempo MX</title></head><body><h1>Página no encontrada</h1><p>Esta dirección no existe.</p><a href="${siteBase}">Volver a Poketiempo MX</a></body></html>`)
console.log(`SEO: ${siteRoutes.length} páginas con HTML, sitemap.xml y robots.txt generados.`)
