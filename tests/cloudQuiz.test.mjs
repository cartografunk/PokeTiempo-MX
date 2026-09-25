import assert from 'node:assert/strict'
import test from 'node:test'
import { letters, questions, combinations, scoreQuiz } from '../src/data/cloudQuiz.ts'

test('the questionnaire contains ten questions with five options each', () => {
  assert.equal(questions.length, 10)
  assert.ok(questions.every(question => question.answers.length === 5))
})

test('each letter produces its own single winner', () => {
  for (const letter of letters) {
    const result = scoreQuiz(Array(10).fill(letter))
    assert.deepEqual(result.winners, [letter])
    assert.equal(result.tally[letter], 10)
    assert.deepEqual(result.bonus, [])
  }
})

test('all ten pairs produce exactly their matching bonus', () => {
  assert.equal(combinations.length, 10)
  assert.equal(new Set(combinations.map(pair => pair.keys.join(''))).size, 10)
  for (let i = 0; i < letters.length; i++) {
    for (let j = i + 1; j < letters.length; j++) {
      const result = scoreQuiz([...Array(5).fill(letters[i]), ...Array(5).fill(letters[j])])
      assert.deepEqual(result.winners, [letters[i], letters[j]])
      assert.equal(result.bonus.length, 1)
      assert.deepEqual(result.bonus[0].keys, [letters[i], letters[j]])
    }
  }
})

test('three-way and five-way ties preserve all winning clouds', () => {
  const triple = scoreQuiz(['A','A','A','B','B','B','C','C','C','E'])
  assert.deepEqual(triple.winners, ['A','B','C'])
  assert.equal(triple.bonus.length, 3)
  const all = scoreQuiz(['A','A','B','B','C','C','D','D','E','E'])
  assert.deepEqual(all.winners, [...letters])
  assert.equal(all.bonus.length, 10)
})

test('a tie below the highest score does not produce a bonus', () => {
  const result = scoreQuiz(['A','A','A','A','B','B','B','C','C','C'])
  assert.deepEqual(result.winners, ['A'])
  assert.deepEqual(result.bonus, [])
})

test('incomplete and invalid answers cannot produce a result', () => {
  assert.throws(() => scoreQuiz([]))
  assert.throws(() => scoreQuiz(Array(10).fill('Z')))
})
