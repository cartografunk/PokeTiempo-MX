import { useRef, useState, type CSSProperties } from 'react'

// Completar con las marcas y fechas confirmadas antes de publicar.
const collaborations = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  brand: index === 0 ? 'Netflix' : 'Marca por confirmar',
  date: index === 0 ? 'Julio 2026' : 'Fecha por confirmar',
}))

export default function CollaborationFlow() {
  const [active, setActive] = useState(0)
  const [opened, setOpened] = useState<number | null>(null)
  const touchStart = useRef<number | null>(null)
  const selected = opened === null ? null : collaborations[opened]
  const move = (direction: number) => {
    setActive(current => (current + direction + collaborations.length) % collaborations.length)
    setOpened(null)
  }

  return (
    <div className="collaboration-flow" role="region" aria-roledescription="carrusel" aria-label="Colaboraciones de Poketiempo MX">
      <div className="flow-stage"
        onTouchStart={event => { touchStart.current = event.touches[0].clientX }}
        onTouchEnd={event => {
          if (touchStart.current === null) return
          const distance = touchStart.current - event.changedTouches[0].clientX
          if (Math.abs(distance) > 45) move(distance > 0 ? 1 : -1)
          touchStart.current = null
        }}
        onKeyDown={event => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            move(event.key === 'ArrowRight' ? 1 : -1)
          }
        }}>
        {collaborations.map((collaboration, index) => {
          const half = Math.floor(collaborations.length / 2)
          const offset = (index - active + collaborations.length + half) % collaborations.length - half
          return <button key={collaboration.id} type="button"
            className={`flow-cover${offset === 0 ? ' is-active' : ''}`}
            style={{ '--offset': offset, '--depth': Math.abs(offset), '--tone': `${index * 45 + 180}deg` } as CSSProperties}
            aria-label={`Ver ficha de colaboración ${collaboration.id}: ${collaboration.brand}`}
            aria-expanded={opened === index} aria-controls="collaboration-details"
            onClick={() => { setActive(index); setOpened(index) }}>
            <img className="flow-cover-image" src={`${import.meta.env.BASE_URL}collaborations/collaboration-0${collaboration.id}.png`} alt="" width="1080" height="1350" />
            <span className="flow-cover-kicker">POKETIEMPO MX / COLABORACIONES</span>
            <span className="flow-cover-number" aria-hidden="true">0{collaboration.id}</span>
            <span className="flow-cover-brand">{collaboration.brand}</span>
            <span className="flow-cover-footer">{index === 0 ? collaboration.date : 'Contenido pendiente'} <span aria-hidden="true">↗</span></span>
          </button>
        })}
      </div>
      <div className="flow-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Colaboración anterior">←</button>
        <span aria-live="polite">{active + 1} / {collaborations.length}</span>
        <button type="button" onClick={() => move(1)} aria-label="Colaboración siguiente">→</button>
      </div>
      <div id="collaboration-details" aria-live="polite">
        {selected && <article className="flow-details">
          <div className="flow-details-heading"><h2>Colaboración 0{selected.id}</h2>
            <button type="button" onClick={() => setOpened(null)} aria-label="Cerrar ficha">Cerrar ×</button>
          </div>
          <dl><div><dt>Marca</dt><dd>{selected.brand}</dd></div>
            <div><dt>¿Cuándo se hizo?</dt><dd>{selected.date}</dd></div></dl>
        </article>}
      </div>
    </div>
  )
}
