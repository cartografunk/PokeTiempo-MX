import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import Seo from '../components/Seo'
import SocialGrid from '../components/SocialGrid'

const introPoints = [
  {
    title: 'Logo',
    text: 'Pendiente (IMAGEN, Opción 1 Collage',
  },
  {
    title: 'Imagen 1',
    text: 'Pendiente',
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
          <p className="eyebrow">Meteorologia + climatología + cultura pop</p>
          <h1>Poketiempo MX</h1>
          <p className="hero-text">
            El tiempo para gente chidix :)
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
          <h2>Una forma mas cercana de hablar del cielo</h2>
          <p>
            Poketiempo MX es un proyecto de divulgación meteorológica que convierte temas sobre el tiempo atmosférico
            en contenido entendible, recordable y compartible para audiencias digitales en Mexico
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

     
      <section className="section channels-section" id="canales">
        <div className="section-heading">
          <p className="eyebrow">Redes sociales</p>
          <h2>La comunidad vive en redes</h2>
          <p>
            Síguenos en nuestras redes sociales
          </p>
        </div>
        <SocialGrid />
      </section>
    </>
  )
}

export default Home
