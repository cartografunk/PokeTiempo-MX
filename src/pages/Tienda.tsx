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


        </article>

        <div className="shop-layout">

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
