import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import Seo from '../components/Seo'
import SocialGrid from '../components/SocialGrid'

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

const switchboardCards = [
  {
    title: 'Media kit',
    text: 'Datos esenciales de comunidad y formatos de colaboracion para marcas, medios e instituciones.',
    to: '/media-kit',
  },
  {
    title: 'Tienda',
    text: 'Merch y objetos coleccionables del proyecto, en fase de preview antes del ecommerce.',
    to: '/tienda',
  },
  {
    title: 'PokéTest',
    text: '¿Que nube eres? Un quiz interactivo para jugar, aprender y compartir con la comunidad.',
    to: '/test',
  },
]

function Home() {
  return (
    <>
      <Seo
        title="Poketiempo MX | Clima, cultura pop y comunidad"
        description="El tiempo en México para gente chidix"
        path="/"
      />

      <section className="hero-section" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Meteorologia + cultura pop + comunidad</p>
          <h1>Poketiempo MX</h1>
          <p className="hero-text">
            El tiempo en México para gente chidix
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#intro">Conocer el proyecto</a>
            <Link className="button secondary" to="/test">Test: ¿Qué nube soy?</Link>
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

      <section className="section switchboard-section" id="explorar">
        <div className="section-heading">
          <p className="eyebrow">Explorar</p>
          <h2>Media kit, tienda y test en un clic.</h2>
        </div>
        <div className="intro-grid">
          {switchboardCards.map((card) => (
            <Link
              to={card.to}
              key={card.title}
              style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
            >
              <article>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            </Link>
          ))}
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
        <SocialGrid />
      </section>
    </>
  )
}

export default Home
