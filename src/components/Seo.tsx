import { Helmet } from 'react-helmet-async'

const siteName = 'Poketiempo MX'
const siteUrl = 'https://poketiempo.mx'
const defaultImage = `${siteUrl}/hero.png`

type SeoProps = {
  title: string
  description: string
  path: '/' | '/media-kit' | '/tienda' | '/test'
  image?: string
}

function Seo({ title, description, path, image = defaultImage }: SeoProps) {
  const canonicalUrl = `${siteUrl}${path === '/' ? '' : path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Poketiempo MX: clima, cultura pop y comunidad" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default Seo
