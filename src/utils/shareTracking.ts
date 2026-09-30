import { resultPath } from '../data/resultImages.ts'
import type { Letter } from '../data/cloudQuiz.ts'
import { pageUrl } from '../siteConfig.ts'

export type ShareSource = 'instagram' | 'whatsapp' | 'facebook' | 'x' | 'native' | 'download'
export type ShareMedium = 'story' | 'post'

export function buildShareUrl(winners: Letter[], source: ShareSource, medium: ShareMedium) {
  const url = new URL(pageUrl(resultPath(winners)))
  url.searchParams.set('ref', 'share')
  url.searchParams.set('utm_source', source)
  url.searchParams.set('utm_medium', medium)
  url.searchParams.set('utm_campaign', 'share_cloud')
  return url.href
}
