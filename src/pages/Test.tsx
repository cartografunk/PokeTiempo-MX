import { useMemo, useState, type CSSProperties } from 'react'
import Seo from '../components/Seo'

type ResultKey = 'cumulo' | 'cumulonimbo' | 'cirro' | 'estrato'
type Answer = {
  label: string
  scores: Partial<Record<ResultKey, number>>
}

const questions: { prompt: string; answers: Answer[] }[] = [
  {
    prompt: 'Cuando cambia el clima de golpe, tu energia es...',
    answers: [
      { label: 'Me emociono, algo se esta moviendo', scores: { cumulonimbo: 2, cumulo: 1 } },
      { label: 'Observo en silencio y saco conclusiones', scores: { cirro: 2, estrato: 1 } },
      { label: 'Mantengo la calma, paso a paso', scores: { estrato: 2 } },
      { label: 'Me pongo de buenas si hay luz bonita', scores: { cumulo: 2 } },
    ],
  },
  {
    prompt: 'Tu plan ideal para una tarde lluviosa:',
    answers: [
      { label: 'Cafe, cobija y mensajes al grupo', scores: { estrato: 2, cumulo: 1 } },
      { label: 'Salir a ver nubes como persona funcional', scores: { cirro: 2 } },
      { label: 'Grabar contenido antes de que pase el momento', scores: { cumulonimbo: 2 } },
      { label: 'Playlist feliz y ventana abierta', scores: { cumulo: 2 } },
    ],
  },
  {
    prompt: 'Si fueras una alerta climatica, sonarias como...',
    answers: [
      { label: 'Atencion: posibilidad de drama electrico', scores: { cumulonimbo: 3 } },
      { label: 'Aviso amable: viene un cambio interesante', scores: { cirro: 2 } },
      { label: 'Cielo gris persistente, pero estable', scores: { estrato: 3 } },
      { label: 'Buen dia para mirar hacia arriba', scores: { cumulo: 3 } },
    ],
  },
  {
    prompt: 'La gente te busca porque...',
    answers: [
      { label: 'Haces que todo se sienta mas ligero', scores: { cumulo: 2 } },
      { label: 'Traes contexto y conectas puntos', scores: { cirro: 2 } },
      { label: 'Cuando llegas, pasan cosas', scores: { cumulonimbo: 2 } },
      { label: 'Das tranquilidad sin hacer ruido', scores: { estrato: 2 } },
    ],
  },
]

const results: Record<ResultKey, {
  name: string
  tag: string
  description: string
  fact: string
  color: string
}> = {
  cumulo: {
    name: 'Cúmulo',
    tag: 'energia de buen clima',
    description: 'Eres presencia ligera, optimista y facil de querer. Apareces y el dia se siente mas amable.',
    fact: 'Los cumulos suelen verse como nubes algodonosas y pueden asociarse con tiempo estable si no crecen demasiado.',
    color: '#5fb7ff',
  },
  cumulonimbo: {
    name: 'Cumulonimbo',
    tag: 'modo tormenta protagonista',
    description: 'Traes intensidad, chispa y cero ganas de pasar desapercibide. Si algo se mueve, seguramente estabas cerca.',
    fact: 'Los cumulonimbos pueden producir lluvia intensa, granizo, rayos y rachas fuertes de viento.',
    color: '#ff5a5f',
  },
  cirro: {
    name: 'Cirro',
    tag: 'senales desde arriba',
    description: 'Eres observacion fina, intuicion y mirada amplia. Ves venir cambios antes de que el resto saque paraguas.',
    fact: 'Los cirros se forman a gran altura y a veces anuncian cambios en las condiciones atmosfericas.',
    color: '#ffcf4a',
  },
  estrato: {
    name: 'Estrato',
    tag: 'cielo tranquilo, mente profunda',
    description: 'Eres calma extendida. No necesitas hacer escandalo para cambiar el ambiente completo.',
    fact: 'Los estratos forman capas bajas y uniformes; pueden traer llovizna o cielos grises persistentes.',
    color: '#9aa3ad',
  },
}

function Test() {
  const [answers, setAnswers] = useState<number[]>([])

  const activeQuestion = questions[answers.length]
  const resultKey = useMemo<ResultKey | null>(() => {
    if (answers.length < questions.length) return null

    const tally: Record<ResultKey, number> = {
      cumulo: 0,
      cumulonimbo: 0,
      cirro: 0,
      estrato: 0,
    }

    answers.forEach((answerIndex, questionIndex) => {
      const answer = questions[questionIndex].answers[answerIndex]
      Object.entries(answer.scores).forEach(([key, score]) => {
        tally[key as ResultKey] += score ?? 0
      })
    })

    return Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0] as ResultKey
  }, [answers])

  const result = resultKey ? results[resultKey] : null
  const seoTitle = result ? `Soy ${result.name} | PokéTest Poketiempo MX` : 'Test Poketiempo MX | Que nube eres'
  const seoDescription = result
    ? `Mi resultado del PokéTest fue ${result.name}: ${result.description}`
    : 'Haz el PokéTest de Poketiempo MX, descubre que tipo de nube eres y comparte tu resultado con tu comunidad.'

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} path="/test" />

      <section className="section test-section" id="test">
        <div className="section-heading">
          <p className="eyebrow">PokéTest</p>
          <h2>¿Que nube eres?</h2>
          <p>Un gancho interactivo para que la audiencia juegue, aprenda y comparta sin salir del universo Poketiempo.</p>
        </div>

        <div className="quiz-card">
          {!result && activeQuestion && (
            <>
              <div className="quiz-progress">
                <span>Pregunta {answers.length + 1} / {questions.length}</span>
                <div><span style={{ width: `${(answers.length / questions.length) * 100}%` }}></span></div>
              </div>
              <h3>{activeQuestion.prompt}</h3>
              <div className="answer-grid">
                {activeQuestion.answers.map((answer, index) => (
                  <button key={answer.label} type="button" onClick={() => setAnswers([...answers, index])}>
                    {answer.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {result && (
            <div className="result-card" style={{ '--result-color': result.color } as CSSProperties}>
              <p className="eyebrow">Tu resultado</p>
              <h3>{result.name}</h3>
              <span>{result.tag}</span>
              <p>{result.description}</p>
              <div className="fact-box">
                <strong>Dato climatico</strong>
                <p>{result.fact}</p>
              </div>
              <div className="result-actions">
                <button type="button" onClick={() => setAnswers([])}>Repetir test</button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Soy ${result.name} en el test de Poketiempo MX. ¿Que nube eres?`)}&url=${encodeURIComponent(`${window.location.origin}/test`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Compartir
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Test
