type Social = {
  label: string
  handle: string
  url: string
}

const socials: Social[] = [
  { label: 'Instagram', handle: '@poketiempo_mx', url: 'https://www.instagram.com/poketiempo_mx/' },
  { label: 'TikTok', handle: '@poketiempo.mx', url: 'https://www.tiktok.com/@poketiempo.mx' },
  { label: 'X', handle: '@poketiempo_mx', url: 'https://x.com/poketiempo_mx' },
  { label: 'Facebook', handle: 'Poketiempo MX', url: 'https://www.facebook.com/poketiempomx/' },
]

function SocialGrid() {
  return (
    <div className="social-grid">
      {socials.map((social) => (
        <a href={social.url} target="_blank" rel="noreferrer" key={social.label}>
          <span>{social.label}</span>
          <strong>{social.handle}</strong>
        </a>
      ))}
    </div>
  )
}

export default SocialGrid
