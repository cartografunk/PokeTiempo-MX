import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import ResultSharing from '../components/ResultSharing'
import { letters, questions, results, scoreQuiz, type Letter } from '../data/cloudQuiz'

function Test() {
  const [answers, setAnswers] = useState<Letter[]>([])
  const [step, setStep] = useState(0)
  const heading = useRef<HTMLHeadingElement>(null)
  const complete = step === questions.length
  const result = complete ? scoreQuiz(answers) : null
  const names = result?.winners.map(key => results.find(item => item.key === key)!.name).join(' + ')

  useEffect(() => {
    if (step > 0 || heading.current?.dataset.visited) heading.current?.focus()
    if (heading.current) heading.current.dataset.visited = 'true'
  }, [step])

  function restart() {
    setAnswers([])
    setStep(0)
  }

  function chooseAnswer(answer: Letter) {
    setAnswers(current => {
      const next = [...current]
      next[step] = answer
      return next
    })
    setStep(current => current + 1)
  }

  return (
    <>
      <Seo title="¿Qué nube soy? | Tests Poketiempo MX" description="Diez preguntas, cinco tipos de nube y un bonus si empatas. Descubre tu personalidad de nube." path="/test" />
      <section className="section test-section">
        <Link className="button secondary quiz-back" to="/tests">← Todos los tests</Link>
        <div className="section-heading">
          <p className="eyebrow">PokéTest · Personalidad</p>
          <h1 className="quiz-title">¿Qué nube soy?</h1>
          <p>Elige la respuesta que más se parezca a ti <br/><br/> Al final descubrirás tu nube</p>
        </div>
        <div className="quiz-card">
          {!complete && (
            <>
              <div className="quiz-progress">
                <span>Pregunta {step + 1} de {questions.length}</span>
                <progress value={step} max={questions.length} aria-label="Preguntas completadas" />
              </div>
              <h2 className="question-title" ref={heading} tabIndex={-1}>{questions[step].prompt}</h2>
              <fieldset className="quiz-options">
                <legend className="sr-only">Elige una respuesta</legend>
                {questions[step].answers.map((answer, index) => (
                  <label className="quiz-option" key={`${step}-${index}`}>
                    <input type="radio" name={`question-${step}`} value={letters[index]} checked={answers[step] === letters[index]}
                      onChange={() => chooseAnswer(letters[index])} />
                    <span><strong>{letters[index]})</strong> {answer}</span>
                  </label>
                ))}
              </fieldset>
              <div className="quiz-navigation">
                <button className="button secondary" type="button" disabled={step === 0} onClick={() => setStep(step - 1)}>Anterior</button>
              </div>
            </>
          )}
          {result && (
            <div className="cloud-results">
              <p className="eyebrow">{result.winners.length > 1 ? 'Bonus: personalidad híbrida de nubes' : 'Tu resultado'}</p>
              <h2 className="result-title" ref={heading} tabIndex={-1}>{names}</h2>
              {result.winners.length > 1 && <p>¡Empate! Estas nubes comparten tu puntuación más alta. Tu personalidad tiene un poco de cada una.</p>}
              <ResultSharing key={result.winners.join("")} winners={result.winners} names={names!} />
              {result.bonus.map(pair => (
                <div className="fact-box" key={pair.keys.join('')}>
                  <strong>{pair.keys.map(key => results.find(item => item.key === key)!.name).join(' + ')}</strong>
                  <p>{pair.description}</p>
                </div>
              ))}
              <details className="result-transcript"><summary>Leer descripción en texto</summary>
              {results.filter(item => result.winners.includes(item.key as Letter)).map(item => (
                <article className="cloud-profile" key={item.key}>
                  <h3>{item.name} — {item.tag}</h3>
                  <p className="cloud-description">{item.description}</p>
                  <p><strong>Tu lado fuerte:</strong> {item.strength}</p>
                  <p><strong>Tu lado complicado:</strong> {item.challenge}</p>
                  <p><strong>Tu frase:</strong> {item.quote}</p>
                </article>
              ))}
              </details>
              <div className="result-actions">
                <button type="button" onClick={restart}>Repetir test</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Test
