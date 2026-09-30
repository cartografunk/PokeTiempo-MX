import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import SocialGrid from '../components/SocialGrid'
import shamedPhoto from '../assets/cv-shamed.svg'
import nube1 from '../assets/clouds/nube1.png'
import nube2 from '../assets/clouds/nube2.png'
import nube3 from '../assets/clouds/nube3.png'
import nube4 from '../assets/clouds/nube4.png'
import { contactEmail } from '../siteConfig'

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
  const [emailCopied, setEmailCopied] = useState(false)
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current)
  }, [])

  const copyEmail = async () => {
    const copyWithFallback = () => {
      const input = document.createElement('textarea')
      input.value = contactEmail
      input.setAttribute('readonly', '')
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      const copied = document.execCommand('copy')
      input.remove()
      return copied
    }

    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(contactEmail)
        } catch {
          if (!copyWithFallback()) throw new Error('No se pudo copiar el correo')
        }
      } else {
        if (!copyWithFallback()) throw new Error('No se pudo copiar el correo')
      }

      setEmailCopied(true)
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current)
      feedbackTimer.current = setTimeout(() => setEmailCopied(false), 2000)
    } catch {
      setEmailCopied(false)
    }
  }

  return (
    <>
      <Seo
        title="Poketiempo MX | Clima, cultura pop y comunidad"
        description="Meteorología, climatología y cultura pop para gente chidix. Conoce Poketiempo MX, sus redes, colaboraciones y el test ¿Qué nube soy?"
        path="/"
      />

      <section className="hero-section" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Meteorología + climatología + cultura pop</p>
          <h1>Poketiempo MX</h1>
          <p className="hero-text">
            El tiempo para gente chidix :)
          </p>
          <div className="hero-actions">
            <a className="button secondary" href="#quienes-somos">Conocer el proyecto</a>
            <Link className="button primary" to="/test">Test: ¿Qué nube soy?</Link>
          </div>
        </div>

        <div className="hero-sky" aria-hidden="true">
          <img className="hero-cloud hero-cloud--1" src={nube1} alt="" loading="eager" decoding="async" />
          <img className="hero-cloud hero-cloud--2" src={nube2} alt="" loading="eager" decoding="async" />
          <img className="hero-cloud hero-cloud--3" src={nube3} alt="" loading="eager" decoding="async" />
          <img className="hero-cloud hero-cloud--4" src={nube4} alt="" loading="eager" decoding="async" />
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

      <section className="section about-section" id="quienes-somos">
        <div className="about-photo-frame">
          <img
            src={shamedPhoto}
            alt="Fotografía provisional de Shamed Saldaña"
            width="800"
            height="1000"
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">Quiénes somos</p>
          <h2>Shamed Saldaña</h2>
          <p className="about-role">Licenciado en Ciencias de la Tierra, UNAM.</p>
          <p>
            Mis intereses profesionales se enfocan en la Meteorología y Climatología, así como en la aplicación de
            conocimientos en programación y análisis de datos para resolver problemas.
          </p>
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

      <section className="section contact-section" id="contacto">
        <div className="contact-copy">
          <p className="eyebrow">Contacto</p>
          <h2>¿Hablamos?</h2>
          <p>Colaboraciones, marcas, prensa o dudas: escríbenos.</p>
        </div>
        <a
          className="button primary contact-email-link"
          href={`mailto:${contactEmail}?subject=${encodeURIComponent('Contacto desde Poketiempo MX')}`}
          aria-label={`Escribir un correo a ${contactEmail} sobre Poketiempo MX`}
        >
          Escribir a {contactEmail}
        </a>
        <div className="contact-copy-row">
          <span>{contactEmail}</span>
          <button
            className="button secondary"
            type="button"
            onClick={copyEmail}
            aria-label={`Copiar el correo ${contactEmail}`}
          >
            {emailCopied ? '¡Copiado!' : 'Copiar correo'}
          </button>
          <span className="sr-only" aria-live="polite">{emailCopied ? 'Correo copiado' : ''}</span>
        </div>
      </section>
    </>
  )
}

export default Home
