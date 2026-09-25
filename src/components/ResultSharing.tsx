import { useState } from 'react'
import { absoluteUrl, pageUrl } from '../siteConfig'
import { resultImagePath } from '../data/resultImages'
import type { Letter } from '../data/cloudQuiz'

type Props = { winners: Letter[]; names: string }

export default function ResultSharing({ winners, names }: Props) {
  const [message, setMessage] = useState('')
  const [imageFailed, setImageFailed] = useState(false)
  const path = resultImagePath(winners)
  const imageUrl = path && !imageFailed ? absoluteUrl(path) : null
  const text = `Soy ${names} en el test de Poketiempo MX. ¿Qué nube eres?`
  function shareUrl(source: string) {
    const url = new URL(pageUrl('/test'))
    url.searchParams.set('utm_source', source)
    url.searchParams.set('utm_medium', 'social')
    url.searchParams.set('utm_campaign', 'que_nube_soy')
    return url.href
  }
  async function shareStory() {
    if (!imageUrl) return
    setMessage('')
    try {
      const response = await fetch(imageUrl)
      if (!response.ok) throw new Error('Imagen no disponible')
      const blob = await response.blob()
      const file = new File([blob], path!.split('/').pop()!, { type: blob.type })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] })
      } else {
        setMessage('Descarga tu imagen y súbela a Historias de Instagram. Puedes añadir la mención @poketiempo_mx.')
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
      setMessage('No pudimos abrir el menú para compartir. Puedes descargar tu imagen y subirla a Instagram.')
    }
  }
  return (
    <section className="result-sharing" aria-label="Imagen y opciones para compartir">
      {imageUrl ? (
        <img className="result-artwork" src={imageUrl} alt={`Mi nube: ${names}`} onError={() => setImageFailed(true)} />
      ) : (
        <div className="result-placeholder" role="img" aria-label={`Tarjeta provisional: ${names}`}>
          <span className="eyebrow">Poketiempo MX</span>
          <div className="pixel-cloud" aria-hidden="true"><span /><span /><span /><span /></div>
          <strong>{names}</strong>
          <span>Mi personalidad de nube</span>
          <small>@poketiempo_mx</small>
        </div>
      )}
      <h3>Compartir con:</h3>
      <div className="result-actions">
        <button type="button" onClick={shareStory} disabled={!imageUrl}>Historias de Instagram{!imageUrl && ' · Próximamente'}</button>
        <a href={`https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl('whatsapp')}`)}`} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl('facebook'))}`} target="_blank" rel="noreferrer">Facebook</a>
        {imageUrl && <a href={imageUrl} download>Descargar imagen</a>}
      </div>
      <p className="share-status" role="status">{message}</p>
      <a className="quiz-back" href="https://www.instagram.com/poketiempo_mx/" target="_blank" rel="noreferrer">Visita @poketiempo_mx</a>
    </section>
  )
}
