import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { sharedResults, resultImages, resultPath } from '../src/data/resultImages.ts'
import { absoluteUrl, pageUrl } from '../src/siteConfig.ts'

for (const { winners } of sharedResults) {
  const path = resultPath(winners)
  const html = await readFile(`dist${path}/index.html`, 'utf8')
  assert.ok(html.includes(`content="${absoluteUrl(resultImages[winners[0]])}"`), path)
  assert.ok(html.includes(`href="${pageUrl(path)}"`), path)
  assert.ok(html.includes('Haz tu test'), path)
  assert.ok(html.includes('noindex, follow'), path)
  assert.ok(!html.includes('Ver mis puntuaciones'), path)
  for (const winner of winners) {
    await access(`dist/${resultImages[winner]}`)
    assert.ok(html.includes(resultImages[winner]), path)
  }
}
console.log('Share previews OK: 31 combinations with images, canonical and return to quiz.')
