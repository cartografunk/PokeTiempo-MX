import assert from 'node:assert/strict'
import test from 'node:test'
import { buildShareUrl } from '../src/utils/shareTracking.ts'

const expected = [
  ['instagram', 'story'],
  ['whatsapp', 'post'],
  ['facebook', 'post'],
  ['x', 'post'],
  ['native', 'post'],
]

test('every share URL points to the result landing and identifies its channel', () => {
  for (const [source, medium] of expected) {
    const url = new URL(buildShareUrl(['A'], source, medium))
    assert.equal(url.origin, 'https://poketiempo.mx')
    assert.equal(url.pathname, '/test/resultado/cirrus/')
    assert.equal(url.searchParams.get('ref'), 'share')
    assert.equal(url.searchParams.get('utm_source'), source)
    assert.equal(url.searchParams.get('utm_medium'), medium)
    assert.equal(url.searchParams.get('utm_campaign'), 'share_cloud')
  }
})

test('hybrid results keep every winning cloud in the landing path', () => {
  const url = new URL(buildShareUrl(['E', 'B'], 'instagram', 'story'))
  assert.equal(url.pathname, '/test/resultado/cumulonimbus-altocumulus/')
})
