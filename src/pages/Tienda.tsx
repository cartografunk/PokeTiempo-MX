import Seo from '../components/Seo'

const productImages = [
  {
    src: `${import.meta.env.BASE_URL}products/bucket-poketiempo/bucket-01.jpg`,
    alt: 'Bucket Poketiempo amarillo con orejas sobre una mesa de madera',
  },
  {
    src: `${import.meta.env.BASE_URL}products/bucket-poketiempo/bucket-02.png`,
    alt: 'Dos personas modelando el Bucket Poketiempo amarillo',
  },
]

const shopItems = [
  { name: 'Bucket Poketiempo', detail: 'Sombrero amarillo con orejas, carita bordada y vibra de alerta feliz.' },
  { name: 'Stickers climaticos', detail: 'Iconos, frases y nubes para laptops, termos y libretas.' },
  { name: 'Prints coleccionables', detail: 'Mapas, fichas y laminas educativas con estetica retro.' },
  { name: 'Kits para talleres', detail: 'Material descargable o fisico para escuelas, marcas e instituciones.' },
]

function Tienda() {
  return (
    <>
      <Seo
        title="Bucket Poketiempo MX | Merch climatico y drops de temporada"
        description="Conoce el Bucket Poketiempo, un sombrero amarillo con orejas y carita bordada para llevar el clima, la cultura pop y la comunidad puestos."
        path="/tienda"
        image="https://poketiempo.mx/products/bucket-poketiempo/bucket-01.jpg"
      />

      <section className="section shop-section" id="tienda">
        <div className="section-heading">
          <p className="eyebrow">Tienda Poketiempo</p>
          <h2>Bucket Poketiempo</h2>
          <p>
            El primer producto ejemplo del universo Poketiempo: un bucket amarillo,
            jugueton y reconocible para convertir cualquier salida en senal climatica.
          </p>
        </div>

        <article className="featured-product">
          <div className="product-gallery" aria-label="Fotos del Bucket Poketiempo">
            <figure className="product-main-image">
              <img src={productImages[0].src} alt={productImages[0].alt} />
            </figure>
            <figure className="product-look-image">
              <img src={productImages[1].src} alt={productImages[1].alt} />
            </figure>
          </div>

          <div className="product-info">
            <span className="tag">DROP 01</span>
            <h3>Sombrero bucket amarillo con orejas</h3>
            <p>
              Una pieza piloto para medir interes antes de producir: suave, fotografiable
              y pensada para lives, festivales, activaciones y fans del clima bonito.
            </p>
            <div className="product-meta">
              <span>Color amarillo iconico</span>
              <span>Carita bordada</span>
              <span>Orejas suaves</span>
              <span>Producto muestra</span>
            </div>
            <a className="button primary" href="mailto:hola@poketiempo.mx?subject=Me%20interesa%20el%20Bucket%20Poketiempo">
              Quiero saber del drop
            </a>
          </div>
        </article>

        <div className="shop-layout">
          <div className="shop-preview bucket-note" aria-label="Estado del producto">
            <span className="card-icon">◆</span>
            <strong>Preview de producto</strong>
            <p>Estas fotos funcionan como mockup visual para validar interes, estilo y posibles cantidades.</p>
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
      </section>
    </>
  )
}

export default Tienda
