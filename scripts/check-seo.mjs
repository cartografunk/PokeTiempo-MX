import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { siteRoutes, pageUrl, absoluteUrl, siteBase } from '../src/siteConfig.ts'
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const titles = new Set()
for (const route of siteRoutes) {
  const html = await readFile(`dist${route === '/' ? '' : route}/index.html`, 'utf8')
  const canonical = pageUrl(route)
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`), route)
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), route)
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, route)
  assert.equal((html.match(/<title>/g) || []).length, 1, route)
  assert.equal((html.match(/<h1\b/g) || []).length, 1, route)
  assert.ok(html.includes('name="description"'), route)
  assert.ok(html.includes('property="og:image"'), route)
  assert.ok(html.includes(`property="og:url" content="${canonical}"`), route)
  assert.ok(!html.includes('content="noindex"'), route)
  assert.ok(html.includes('<div id="root"><main>'), route)
  titles.add(html.match(/<title>(.*?)<\/title>/)[1])
  for (const [, url] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    if (url.startsWith(`${siteBase}assets/`)) await access(`dist/${url.slice(siteBase.length)}`)
  }
  const image = html.match(/property="og:image" content="([^"]+)"/)[1]
  await access(`dist/${image.slice(absoluteUrl().length)}`)
}
assert.equal(titles.size, siteRoutes.length)
assert.ok((await readFile('dist/robots.txt','utf8')).includes(absoluteUrl('sitemap.xml')))
assert.ok((await readFile('dist/404.html','utf8')).includes('content="noindex"'))
console.log('SEO verificado: cinco páginas, canonicals, títulos, contenido, imágenes, recursos, sitemap y 404.')
