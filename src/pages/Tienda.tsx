const shopItems = [
  { name: 'Playeras de temporada', detail: 'Drops ligados a lluvias, calor, frentes frios y huracanes.' },
  { name: 'Stickers climaticos', detail: 'Iconos, frases y nubes para laptops, termos y libretas.' },
  { name: 'Prints coleccionables', detail: 'Mapas, fichas y laminas educativas con estetica retro.' },
  { name: 'Kits para talleres', detail: 'Material descargable o fisico para escuelas, marcas e instituciones.' },
]

function Tienda() {
  return (
    <section className="section shop-section" id="tienda">
      <div className="section-heading">
        <p className="eyebrow">Tienda Poketiempo</p>
        <h2>Merch y objetos para llevar el clima puesto.</h2>
        <p>
          Un apartado preparado para futuros drops sin convertir el preview en ecommerce todavia:
          primero colecciones piloto, interes de comunidad y posibles alianzas de produccion.
        </p>
      </div>
      <div className="shop-layout">
        <div className="shop-preview" aria-label="Vista previa de producto retro">
          <div className="tag">DROP 01</div>
          <div className="shirt" aria-hidden="true">
            <span></span>
          </div>
          <strong>Nube local</strong>
          <p>Edicion piloto para medir interes antes de producir.</p>
        </div>
        <div className="shop-list">
          {shopItems.map((item) => (
            <article key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
      <a className="button primary" href="mailto:hola@poketiempo.mx?subject=Me%20interesa%20la%20tienda%20Poketiempo">
        Consultar futuros drops
      </a>
    </section>
  )
}

export default Tienda
