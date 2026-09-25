import type { Letter } from './cloudQuiz'

// Archivos finales en public/results/. Claves: A, B, C, D, E y pares
// ordenados AB, AC, AD, AE, BC, BD, BE, CD, CE, DE.
// Ejemplo: A: 'results/cirrus.png'. Vacío = tarjeta provisional.
export const resultImages: Partial<Record<string, string>> = {}
export function resultImagePath(winners: Letter[]) {
  return resultImages[[...winners].sort().join('')]
}
