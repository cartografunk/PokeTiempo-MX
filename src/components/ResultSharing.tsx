import { useEffect, useState } from 'react'
import { resultImages } from '../data/resultImages'
import { results, type Letter } from '../data/cloudQuiz'
import { buildShareUrl } from '../utils/shareTracking'

type Props = { winners: Letter[]; names: string }
type StoryArtwork = { letter: Letter; file: File; url: string }

export default function ResultSharing({ winners, names }: Props) {
  const [message, setMessage] = useState('')
  const [artworks, setArtworks] = useState<StoryArtwork[]>([])
  const [busy, setBusy] = useState(false)
  const [showLink, setShowLink] = useState(false)
  const key = [...winners].sort().join('')
  const text = `Soy ${names}. ¿Qué nube eres tú? Haz el test de Poketiempo MX.`

  useEffect(() => {
    const controller = new AbortController()
    const objectUrls: string[] = []
    Promise.all((key.split('') as Letter[]).map(async letter => {
      const path = resultImages[letter]
      const response = await fetch(`${import.meta.env.BASE_URL}${path}`, { signal: controller.signal })
      if (!response.ok) throw new Error('No se pudo cargar la imagen del resultado.')
      const file = new File([await response.blob()], path.split('/').pop()!, { type: 'image/png' })
      const url = URL.createObjectURL(file)
      objectUrls.push(url)
      return { letter, file, url }
    })).then(setArtworks).catch(error => {
      if (error.name !== 'AbortError') setMessage('No se pudo preparar la imagen. Puedes compartir el enlace o intentar descargarla.')
    })
    return () => {
      controller.abort()
      objectUrls.forEach(URL.revokeObjectURL)
    }
  }, [key])

  async function copyLink() {
    const url = buildShareUrl(winners, 'instagram', 'story')
    try {
      await navigator.clipboard.writeText(url)
      setMessage('Enlace copiado. En Instagram, añade el sticker «Enlace» a tu historia y pégalo.')
    } catch {
      setShowLink(true)
      setMessage('Selecciona y copia este enlace para pegarlo en tu historia.')
    }
  }

  async function shareImage(story: boolean) {
    const files = artworks.map(artwork => artwork.file)
    const payload = story
      ? { files }
      : { files, text, url: buildShareUrl(winners, 'native', 'post') }
    if (!artworks.length || !navigator.canShare?.(payload)) {
      setMessage('Descarga la imagen y publícala desde tu app. Copia el enlace para añadirlo al texto o al sticker «Enlace» de tu historia.')
      return
    }
    setBusy(true)
    try {
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
      <h3>Comparte tu nube e invita a alguien a descubrir la suya</h3>
      <p>Tu nube ya tiene imagen lista para compartir. Descárgala completa y con mejor calidad que una captura de pantalla.</p>
      <p>Compartir en:</p>
      <div className="result-actions share-actions">
        <button className="button primary" type="button" onClick={() => shareImage(false)} disabled={!artworks.length || busy}>Compartir mi nube</button>
        <button type="button" onClick={() => shareImage(true)} disabled={!artworks.length || busy}>Historias de Instagram</button>
        <a href={`https://wa.me/?text=${encodeURIComponent(`${text} ${buildShareUrl(winners, 'whatsapp', 'post')}`)}`} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(buildShareUrl(winners, 'facebook', 'post'))}`} target="_blank" rel="noreferrer">Facebook</a>
        <a href={`https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(buildShareUrl(winners, 'x', 'post'))}`} target="_blank" rel="noreferrer">X</a>
        {winners.map(letter => {
          const profile = results.find(item => item.key === letter)!
          const artwork = artworks.find(item => item.letter === letter)
          return artwork
            ? <a key={letter} href={artwork.url} download={artwork.file.name}>
                {winners.length === 1 ? 'Descargar imagen' : `Descargar imagen ${profile.name}`}
              </a>
            : <button key={letter} type="button" disabled>Preparando imagen…</button>
        })}
      </div>
      <aside className="story-guide" aria-labelledby="story-guide-title">
        <h3 id="story-guide-title">Instagram Stories en iPhone</h3>
        <ol>
          <li>Comparte o descarga tu imagen.</li>
          <li>En Instagram, añade el sticker «Enlace».</li>
          <li>Pega el enlace y menciona a <strong>@poketiempo_mx</strong>.</li>
        </ol>
        <button className="button primary" type="button" onClick={copyLink}>Copiar enlace para mi historia</button>
      </aside>
      <p className="share-status" role="status">{message}</p>
      {showLink && <label className="manual-share-link">Enlace para copiar<input readOnly value={buildShareUrl(winners, 'instagram', 'story')} onFocus={event => event.currentTarget.select()} /></label>}
      <div className="result-artworks">
        {winners.map(letter => {
          const profile = results.find(item => item.key === letter)!
          return <figure key={letter}>
            <img
              className="result-artwork"
              src={`${import.meta.env.BASE_URL}${resultImages[letter]}`}
              alt={`${profile.name}: ${profile.tag}. ${profile.description} Tu lado fuerte: ${profile.strength}. Tu lado complicado: ${profile.challenge}. Tu frase: ${profile.quote}`}
              width="1080"
              height="1920"
            />
          </figure>
        })}
      </div>
    </section>
  )
}
