import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import ResultSharing from '../components/ResultSharing'
import { sharedResults, resultImages, resultPath } from '../data/resultImages'
import { results, combinations } from '../data/cloudQuiz'
import { absoluteUrl } from '../siteConfig'

export default function SharedResult() {
  const { slug } = useParams()
  const shared = sharedResults.find(item => item.slug === slug)
  if (!shared) return <section className="section"><Helmet><title>Resultado no encontrado | Poketiempo MX</title><meta name="robots" content="noindex" /></Helmet><h1 className="quiz-title">Resultado no encontrado</h1><Link className="button primary" to="/test">Hacer el test</Link></section>

  const names = shared.winners.map(key => results.find(item => item.key === key)!.name).join(' + ')
  return (
    <>
      <Seo title={`${names} | ¿Qué nube soy? · Poketiempo MX`} description={`Esta personalidad de nube es ${names}. Descubre la tuya: haz el test de Poketiempo MX.`} path={resultPath(shared.winners)} image={absoluteUrl(resultImages[shared.winners[0]])} noindex />
      <section className="section test-section">
        <p className="eyebrow">Te compartieron este resultado</p>
        <h1 className="result-title">{names}</h1>
        <p>Alguien quiere saber qué nube eres. Responde diez preguntas y descubre tu resultado.</p>
        <Link className="button primary share-landing-cta" to="/test">Haz tu test</Link>
        <div className="quiz-card shared-result-card">
          <ResultSharing key={shared.slug} winners={shared.winners} names={names} />
          {combinations.filter(pair => pair.keys.every(key => shared.winners.some(winner => winner === key))).map(pair => <p key={pair.keys.join('')}>{pair.description}</p>)}
        </div>
        <Link className="button primary" to="/test">Descubre qué nube eres</Link>
      </section>
    </>
  )
}
