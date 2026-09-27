import { useEffect, useState } from 'react'
import { pageUrl } from '../siteConfig'
import { resultImages, resultPath } from '../data/resultImages'
import { results, type Letter } from '../data/cloudQuiz'

type Props = { winners: Letter[]; names: string }

export default function ResultSharing({ winners, names }: Props) {
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [busy, setBusy] = useState(false)
  const [showLink, setShowLink] = useState(false)
  const key = [...winners].sort().join('')
  const text = `Soy ${names}. ¿Qué nube eres tú? Haz el test de Poketiempo MX.`
  function shareUrl(source: string) {
    const url = new URL(pageUrl(resultPath(winners)))
    url.searchParams.set('utm_source', source)
    url.searchParams.set('utm_medium', 'social')
    url.searchParams.set('utm_campaign', 'que_nube_soy')
    return url.href
  }
  useEffect(() => {
    const controller = new AbortController()
    Promise.all((key.split('') as Letter[]).map(async letter => {
      const path = resultImages[letter]
      const response = await fetch(`${import.meta.env.BASE_URL}${path}`, { signal: controller.signal })
      if (!response.ok) throw new Error('Imagen no disponible')
      return new File([await response.blob()], path.split('/').pop()!, { type: 'image/png' })
    })).then(setFiles).catch(error => {
      if (error.name !== 'AbortError') setMessage('No se pudo preparar la imagen. Puedes compartir el enlace o intentar descargarla.')
    })
    return () => controller.abort()
  }, [key])

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl('instagram'))
      setMessage('Enlace copiado. En Instagram, añade el sticker «Enlace» a tu historia y pégalo.')
    } catch {
      setShowLink(true)
      setMessage('Selecciona y copia este enlace para pegarlo en tu historia.')
    }
  }
  async function shareImage(story: boolean) {
    const payload = story ? { files } : { files, text, url: shareUrl('compartir') }
    if (!files.length || !navigator.canShare?.(payload)) {
      setMessage('Descarga la imagen y publícala desde tu app. Copia el enlace para añadirlo al texto o al sticker «Enlace» de tu historia.')
      return
    }
    setBusy(true)
    try {
      // Files are already loaded so the click still authorizes the native share sheet.
      await navigator.share(payload)
    } catch (error) {
      if (!(error instanceof Error && error.name === 'AbortError')) {
        setMessage('No se pudo abrir el menú para compartir. Descarga la imagen y copia el enlace.')
      }
    } finally {
      setBusy(false)
    }
  }
  return (
    <section className="result-sharing" aria-label="Imagen y opciones para compartir">
      <div className="result-artworks">
        {winners.map(letter => {
          const profile = results.find(item => item.key === letter)!
          return <figure key={letter}>
            <img className="result-artwork" src={`${import.meta.env.BASE_URL}${resultImages[letter]}`} alt={`${profile.name}: ${profile.tag}. ${profile.description} Tu lado fuerte: ${profile.strength}. Tu lado complicado: ${profile.challenge}. Tu frase: ${profile.quote}`} width="1080" height="1920" />
          </figure>
        })}
      </div>
      <h3>Comparte tu nube e invita a alguien a descubrir la suya</h3>
      <p>Compartir con:</p>
      <div className="result-actions share-actions">
        <button type="button" onClick={() => shareImage(true)} disabled={!files.length || busy}>Historias de Instagram</button>
        <a href={`https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl('whatsapp')}`)}`} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl('facebook'))}`} target="_blank" rel="noreferrer">Facebook</a>
        <button type="button" onClick={() => shareImage(false)} disabled={!files.length || busy}>Compartir imagen y enlace</button>
        <button type="button" onClick={copyLink}>Copiar enlace para mi historia</button>
        {winners.map(letter => {
          const profile = results.find(item => item.key === letter)!
          return <a key={letter} href={`${import.meta.env.BASE_URL}${resultImages[letter]}`} download>
            {winners.length === 1 ? 'Descargar imagen' : `Descargar imagen ${profile.name}`}
          </a>
        })}
      </div>
      <p className="story-help">Para Instagram: comparte o descarga tu imagen, añade el sticker «Enlace» y pega el enlace copiado. Puedes mencionar a @poketiempo_mx. Las apps disponibles dependen de tu teléfono.</p>
      <p className="share-status" role="status">{message}</p>
      {showLink && <label className="manual-share-link">Enlace para copiar<input readOnly value={shareUrl('instagram')} onFocus={event => event.currentTarget.select()} /></label>}
    </section>
  )
}
