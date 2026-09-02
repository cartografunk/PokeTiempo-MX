import { useMemo, useState, type CSSProperties } from 'react'
import './App.css'

type ResultKey = 'cumulo' | 'cumulonimbo' | 'cirro' | 'estrato'
type Answer = {
  label: string
  scores: Partial<Record<ResultKey, number>>
}

const socials = [
  { label: 'Instagram', handle: '@poketiempo_mx', url: 'https://www.instagram.com/poketiempo_mx/' },
  { label: 'TikTok', handle: '@poketiempo_mx', url: 'https://www.tiktok.com/@poketiempo_mx' },
  { label: 'X', handle: '@poketiempo_mx', url: 'https://x.com/poketiempo_mx' },
  { label: 'Facebook', handle: 'Poketiempo MX', url: 'https://www.facebook.com/poketiempomx/' },
]

const collaborationFormats = [
  'Videos cortos con narrativa meteorologica',
  'Carruseles educativos para temporadas climaticas',
  'Historias con encuestas y participacion de comunidad',
  'Charlas, talleres y activaciones educativas',
  'Campanas de prevencion con lenguaje claro',
  'Coberturas especiales con enfoque de divulgacion',
]

const introPoints = [
  {
    title: 'Clima con lenguaje de comunidad',
    text: 'El proyecto baja la meteorologia a una conversacion visual, cotidiana y facil de compartir.',
  },
  {
    title: 'Cultura pop sin perder rigor',
    text: 'La estetica y el humor abren la puerta; la informacion clara sostiene la confianza.',
  },
  {
    title: 'Canales que ya funcionan',
    text: 'La web ordena la historia del proyecto; la conversacion diaria se mantiene en Instagram, TikTok, X y Radio Poketiempo.',
  },
]

const mediaStats = [
  { value: '142K+', label: 'comunidad en Instagram' },
  { value: '1.6K+', label: 'publicaciones indexadas' },
  { value: '5', label: 'canales sociales activos' },
  { value: 'MX', label: 'enfoque nacional' },
]

const shopItems = [
  { name: 'Playeras de temporada', detail: 'Drops ligados a lluvias, calor, frentes frios y huracanes.' },
  { name: 'Stickers climaticos', detail: 'Iconos, frases y nubes para laptops, termos y libretas.' },
  { name: 'Prints coleccionables', detail: 'Mapas, fichas y laminas educativas con estetica retro.' },
  { name: 'Kits para talleres', detail: 'Material descargable o fisico para escuelas, marcas e instituciones.' },
]

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

function App() {
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

  return (
    <main>
      <nav className="topbar" aria-label="Navegacion principal">
        <a className="brand" href="#inicio" aria-label="Poketiempo MX inicio">
          <span className="brand-mark">PT</span>
          <span>Poketiempo MX</span>
        </a>
        <div className="nav-links">
          <a href="#intro">Proyecto</a>
          <a href="#colaboraciones">Colaboraciones</a>
          <a href="#mediakit">Media kit</a>
          <a href="#tienda">Tienda</a>
          <a href="#test">Test</a>
          <a href="#contacto">Contacto</a>
        </div>
      </nav>

      <section className="hero-section" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Meteorologia + cultura pop + comunidad</p>
          <h1>Poketiempo MX</h1>
          <p className="hero-text">
            Un sitio oficial para entender el proyecto, consultar su media kit y explorar
            experiencias interactivas sin mover la conversacion fuera de sus canales sociales.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#intro">Conocer el proyecto</a>
            <a className="button secondary" href="#test">Hacer el test</a>
          </div>
        </div>

        <div className="console" aria-label="Concepto visual retro climatico">
          <div className="console-screen">
            <div className="screen-header">
              <span>RADAR-LINK</span>
              <span>MX</span>
            </div>
            <div className="pixel-cloud" aria-hidden="true">
              <span></span><span></span><span></span><span></span>
            </div>
            <div className="weather-bars">
              <span style={{ '--height': '68%' } as CSSProperties}></span>
              <span style={{ '--height': '42%' } as CSSProperties}></span>
              <span style={{ '--height': '86%' } as CSSProperties}></span>
              <span style={{ '--height': '56%' } as CSSProperties}></span>
              <span style={{ '--height': '73%' } as CSSProperties}></span>
            </div>
            <p>senal climatica en comunidad</p>
          </div>
          <div className="console-controls">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      <section className="section intro-section" id="intro">
        <div className="intro-lead">
          <p className="eyebrow">¿Que es Poketiempo MX?</p>
          <h2>Una forma mas cercana de hablar del cielo.</h2>
          <p>
            Poketiempo MX es un proyecto de divulgacion climatica que convierte temas meteorologicos
            en contenido entendible, recordable y compartible para audiencias digitales en Mexico.
          </p>
        </div>
        <div className="intro-grid">
          {introPoints.map((point) => (
            <article key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">Por que funciona</p>
          <h2>Una marca de clima que si entiende internet.</h2>
        </div>
        <p>
          Poketiempo MX traduce fenomenos meteorologicos en piezas visuales, utiles y conversables.
          Su valor esta en acercar temas de clima, prevencion y actualidad a una audiencia que
          busca explicaciones claras, contexto y una identidad reconocible.
        </p>
      </section>

      <section className="section" id="colaboraciones">
        <div className="section-heading">
          <p className="eyebrow">Colaboraciones</p>
          <h2>Formas de colaborar con el proyecto.</h2>
          <p>Una referencia para marcas, medios e instituciones que quieran participar desde la educacion, la cultura y la prevencion climatica.</p>
        </div>
        <div className="format-grid">
          {collaborationFormats.map((format) => (
            <article className="format-card" key={format}>
              <span className="card-icon">◆</span>
              <h3>{format}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section media-panel" id="mediakit">
        <div className="section-heading">
          <p className="eyebrow">Media kit digital</p>
          <h2>Informacion esencial para evaluar colaboraciones.</h2>
        </div>
        <div className="stats-grid">
          {mediaStats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section shop-section" id="tienda">
        <div className="section-heading">
          <p className="eyebrow">Tienda Poketiempo</p>
          <h2>Merch y objetos para llevar el clima puesto.</h2>
          <p>
            Un apartado preparado para futuros drops sin convertir el preview en ecommerce todavia:
            primero colecciones piloto, interes de comunidad y posibles alianzas de produccion.
          </p>
        </div>
        <div className="shop-layout">
          <div className="shop-preview" aria-label="Vista previa de producto retro">
            <div className="tag">DROP 01</div>
            <div className="shirt" aria-hidden="true">
              <span></span>
            </div>
            <strong>Nube local</strong>
            <p>Edicion piloto para medir interes antes de producir.</p>
          </div>
          <div className="shop-list">
            {shopItems.map((item) => (
              <article key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
        <a className="button primary" href="mailto:hola@poketiempo.mx?subject=Me%20interesa%20la%20tienda%20Poketiempo">
          Consultar futuros drops
        </a>
      </section>

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
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Soy ${result.name} en el test de Poketiempo MX. ¿Que nube eres?`)}`}
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

      <section className="section radio-strip">
        <div>
          <p className="eyebrow">Radio Poketiempo</p>
          <h2>El canal vive en Instagram.</h2>
        </div>
        <p>
          La web no reemplaza Radio Poketiempo: lo presenta, lo legitima y manda a la gente al canal oficial dentro
          de la suite de Meta.
        </p>
        <a className="button primary" href="https://www.instagram.com/poketiempo_mx/" target="_blank" rel="noreferrer">
          Abrir Instagram
        </a>
      </section>

      <section className="section channels-section" id="canales">
        <div className="section-heading">
          <p className="eyebrow">Canales oficiales</p>
          <h2>La comunidad vive en redes.</h2>
          <p>
            Este sitio funciona como carta de presentacion y archivo del proyecto. Para seguir el ritmo diario,
            las actualizaciones y Radio Poketiempo, estos son los canales oficiales.
          </p>
        </div>
        <div className="social-grid">
          {socials.map((social) => (
            <a href={social.url} target="_blank" rel="noreferrer" key={social.label}>
              <span>{social.label}</span>
              <strong>{social.handle}</strong>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer" id="contacto">
        <div>
          <strong>Poketiempo MX</strong>
          <p>Sitio oficial, media kit y experiencias interactivas del proyecto.</p>
        </div>
        <a className="button secondary" href="mailto:hola@poketiempo.mx">Contacto</a>
      </footer>
    </main>
  )
}

export default App
