# Poketiempo MX

## Desarrollo y publicación

- `npm run dev`: desarrollo local.
- `npm run build`: compila React y genera HTML completo para las cinco rutas, sitemap.xml, robots.txt y 404.html en dist.
- `node scripts/check-seo.mjs`: verifica los archivos generados después de compilar.
- `node --test tests/cloudQuiz.test.mjs`: prueba el cálculo del test.
- `npm run preview`: revisa el resultado de producción.
- `npm run deploy`: publica dist en la rama gh-pages. No se ejecuta automáticamente al editar.

## SEO y dominio

La dirección pública está centralizada en `src/siteConfig.ts`:
`https://cartografunk.github.io/PokeTiempo-MX/`.
Las páginas usan canonical con barra final porque se publican como carpetas con index.html. El contenido y los metadatos se renderizan al compilar; React hidrata las páginas para activar navegación y cuestionario. Las rutas desconocidas tienen noindex.

No editar robots.txt ni sitemap.xml en dist: se regeneran en cada build desde la misma configuración que las URLs canónicas. Se eliminaron las copias antiguas que apuntaban al dominio no adquirido.

### Search Console (paso pendiente en la cuenta del propietario)

Después de publicar, añadir una propiedad de prefijo de URL para la dirección anterior. Verificarla con el archivo HTML proporcionado por Google: guardarlo con su nombre y contenido exactos en public, compilar y publicar. No inventar un código de verificación. Enviar el sitemap publicado en `https://cartografunk.github.io/PokeTiempo-MX/sitemap.xml` e inspeccionar las cinco URLs. Esto solicita descubrimiento, no garantiza indexación.

En un sitio de proyecto, el robots.txt generado vive dentro de /PokeTiempo-MX/ y los buscadores no lo usan como reglas del dominio: consultan https://cartografunk.github.io/robots.txt. Gestionar ese archivo requiere el repositorio del sitio raíz. No se modificó ese otro sitio. El sitemap se puede enviar directamente a Search Console.

### Cuando se compre el dominio

1. Configurar y verificar el dominio en GitHub Pages, DNS y HTTPS.
2. Cambiar siteUrl en src/siteConfig.ts por la URL HTTPS definitiva, con barra final. La base, imágenes, canonical, sitemap y robots se ajustan automáticamente.
3. Añadir public/CNAME con el dominio definitivo si se continúa publicando con gh-pages.
4. Compilar, ejecutar la comprobación SEO, previsualizar y publicar.
5. Verificar la nueva propiedad en Search Console, enviar su sitemap y comprobar redirecciones desde las URLs antiguas.

Los enlaces de correo hola@poketiempo.mx siguen siendo pendientes hasta configurar dominio y correo. Las páginas generales usan hero.png; las páginas de resultados usan las tarjetas PNG de cada nube. SEO y Search Console no identifican personas que realizan el test; la analítica de eventos se configura por separado.

## Imágenes y compartir resultados

Las cinco tarjetas originales de assets/img se publican sin modificar en public/results. El mapa está en src/data/resultImages.ts. Si se actualiza un diseño original, copiarlo también a public/results antes de compilar. Todas miden 1080 × 1920; la página conserva su proporción completa.

El resultado muestra primero la imagen y mantiene la descripción textual en un desplegable accesible. «Descargar imagen» está dentro del grupo de acciones para compartir; los empates muestran una descarga identificada para cada nube ganadora.

Cada combinación tiene una página estática en /test/resultado/... con título, canonical, imagen Open Graph y botón para hacer el test. Los enlaces de WhatsApp y Facebook apuntan a esa página con UTM por canal. Para combinaciones, la vista previa usa la primera nube; la página muestra todas. Las redes pueden recortar o almacenar en caché la vista previa.

Historias usa el menú nativo con las imágenes ya cargadas. El usuario debe añadir el sticker Enlace en Instagram: el botón de copiar prepara la URL. No se puede forzar Instagram como destino ni insertar automáticamente el sticker desde esta web. Compartir imagen y enlace ofrece ambos datos al menú nativo, pero la app elegida decide cuáles conserva. Descarga y copia manual siguen disponibles.

Las páginas de resultados usan noindex, follow y no aparecen en el sitemap; las cinco páginas principales sí. Esto mantiene las vistas previas disponibles sin multiplicar páginas de combinaciones en la búsqueda.

Validación: npm run build, node scripts/check-seo.mjs, node scripts/check-sharing.mjs y node --test tests/cloudQuiz.test.mjs.

No hay proveedor de analítica conectado: los UTM preparan atribución, pero por sí solos no guardan visitas ni eventos. No se identifica al participante.
