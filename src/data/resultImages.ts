import type { Letter } from './cloudQuiz'
export const resultImages: Record<Letter, string> = {
  A: 'results/a-cirrus.png', B: 'results/b-cumulonimbus.png',
  C: 'results/c-cumulus.png', D: 'results/d-stratus.png', E: 'results/e-altocumulus.png',
}
const slugs: Record<Letter, string> = { A: 'cirrus', B: 'cumulonimbus', C: 'cumulus', D: 'stratus', E: 'altocumulus' }
export const sharedResults = Array.from({ length: 31 }, (_, index) => {
  const winners = (Object.keys(slugs) as Letter[]).filter((_, bit) => (index + 1) & (1 << bit))
  return { winners, slug: winners.map(key => slugs[key]).join('-') }
})
export function resultPath(winners: Letter[]): `/test/resultado/${string}` {
  return `/test/resultado/${[...winners].sort().map(key => slugs[key]).join('-')}`
}
export function resultImagePath(winners: Letter[]) { return resultImages[winners[0]] }
