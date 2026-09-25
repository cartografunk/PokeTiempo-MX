import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function Tests() {
  return (
    <>
      <Seo title="Tests | Poketiempo MX" description="Juega con el cielo y descubre tu personalidad con los tests de Poketiempo MX." path="/tests" />
      <section className="section test-section">
        <div className="section-heading">
          <p className="eyebrow">PokéTests</p>
          <h1 className="quiz-title">Tests</h1>
          <p>Un ratito para jugar y descubrir qué dice el cielo de ti.</p>
        </div>
        <article className="quiz-card test-preview">
          <div className="pixel-cloud" aria-hidden="true"><span /><span /><span /><span /></div>
          <p className="eyebrow">Personalidad · 10 preguntas</p>
          <h2>¿Qué nube soy?</h2>
          <p>¿Cirrus, Cumulonimbus, Cumulus, Stratus o Altocumulus? Descubre tu nube y las combinaciones bonus si empatas.</p>
          <Link className="button primary" to="/test">Hacer el test</Link>
        </article>
      </section>
    </>
  )
}
