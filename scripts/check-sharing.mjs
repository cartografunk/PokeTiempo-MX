import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { sharedResults, resultImages, resultPath } from '../src/data/resultImages.ts'
import { absoluteUrl, pageUrl } from '../src/siteConfig.ts'
import { buildShareUrl } from '../src/utils/shareTracking.ts'

for (const { winners } of sharedResults) {
  const path = resultPath(winners)
  const html = await readFile(`dist${path}/index.html`, 'utf8')
  assert.ok(html.includes(`content="${absoluteUrl(resultImages[winners[0]])}"`), path)
  assert.ok(html.includes(`href="${pageUrl(path)}"`), path)
  assert.ok(html.includes('Haz tu test'), path)
  assert.ok(html.includes('Te compartieron este resultado'), path)
  assert.ok(html.includes('noindex, follow'), path)
  assert.ok(!html.includes('Ver mis puntuaciones'), path)
  for (const winner of winners) {
    await access(`dist/${resultImages[winner]}`)
    assert.ok(html.includes(resultImages[winner]), path)
  }
  const incoming = new URL(buildShareUrl(winners, 'instagram', 'story'))
  assert.equal(incoming.searchParams.get('ref'), 'share')
  assert.equal(incoming.searchParams.get('utm_campaign'), 'share_cloud')
}
console.log('Share funnel OK: 31 result landings, images, CTA, canonical and tracked incoming URLs.')
