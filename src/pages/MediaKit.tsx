import CollaborationFlow from '../components/CollaborationFlow'
import Seo from '../components/Seo'
import StatsGrid from '../components/StatsGrid'
import { contactEmail } from '../siteConfig'

function MediaKit() {
  return (
    <>
      <Seo
        title="Media Kit Poketiempo MX | Audiencia, redes y colaboraciones"
        description="Consulta el media kit de Poketiempo MX con datos de comunidad, canales sociales y formatos de colaboracion para marcas, medios e instituciones."
        path="/media-kit"
      />

      <section className="section" id="colaboraciones">
        <div className="section-heading">
          <p className="eyebrow">Colaboraciones</p>
          <h1 className="quiz-title">Colabora con Shamed Saldaña</h1>
          <p>Si te interesa una colaboación, contáctanos
            <br />Abajo puedes ver algunas de las colaboraciones que hemos realizado con marcas.
          </p>
        </div>
        <CollaborationFlow />
      </section>

      <section className="section media-panel" id="mediakit">
        <div className="section-heading">
          <p className="eyebrow">Media kit digital</p>
          <h2>Informacion esencial para evaluar colaboraciones.</h2>
        </div>
        <StatsGrid />
        <a
          className="button primary"
          href={`mailto:${contactEmail}?subject=${encodeURIComponent('Colaboración con Poketiempo MX')}`}
          aria-label={`Proponer una colaboración por correo a ${contactEmail}`}
        >
          Contactar para colaboración
        </a>
      </section>
    </>
  )
}

export default MediaKit
