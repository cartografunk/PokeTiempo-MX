import StatsGrid from '../components/StatsGrid'

const collaborationFormats = [
  'Videos cortos con narrativa meteorologica',
  'Carruseles educativos para temporadas climaticas',
  'Historias con encuestas y participacion de comunidad',
  'Charlas, talleres y activaciones educativas',
  'Campanas de prevencion con lenguaje claro',
  'Coberturas especiales con enfoque de divulgacion',
]

function MediaKit() {
  return (
    <>
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
        <StatsGrid />
        <a className="button primary" href="mailto:hola@poketiempo.mx?subject=Colaboracion%20con%20Poketiempo%20MX">
          Contactar para colaboracion
        </a>
      </section>
    </>
  )
}

export default MediaKit
