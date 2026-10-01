# Poketiempo MX

## Desarrollo y publicación

- `npm run dev`: desarrollo local.
- `npm run build`: compila React y genera HTML completo para las cinco rutas, sitemap.xml, robots.txt y 404.html en dist.
- `node scripts/check-seo.mjs`: verifica los archivos generados después de compilar.
- `node scripts/check-sharing.mjs`: verifica las landings compartibles.
- `node --test tests/*.test.mjs`: prueba el cálculo del test y las URLs de campaña.
- `npm run preview`: revisa el resultado de producción.
- `npm run deploy`: publica dist en la rama gh-pages. No se ejecuta automáticamente al editar.

## SEO y dominio

La dirección pública está centralizada en `src/siteConfig.ts`: `https://poketiempo.mx/`. Las páginas usan canonical con barra final porque se publican como carpetas con index.html. El contenido y los metadatos se renderizan al compilar; React hidrata las páginas para activar navegación y cuestionario. Las rutas desconocidas tienen noindex.

No editar robots.txt ni sitemap.xml en dist: se regeneran en cada build desde la misma configuración que las URLs canónicas.

### Search Console

Después de publicar, añadir una propiedad de prefijo de URL para `https://poketiempo.mx/`. Verificarla con el archivo HTML proporcionado por Google: guardarlo con su nombre y contenido exactos en public, compilar y publicar. Enviar `https://poketiempo.mx/sitemap.xml` e inspeccionar las cinco URLs.

El archivo robots.txt se publica en `https://poketiempo.mx/robots.txt` y apunta al sitemap del dominio propio.

### Dominio propio

`siteUrl` define `https://poketiempo.mx/` y `siteBase` resulta `/`. Vite y los routers usan esa base. `public/CNAME` contiene `poketiempo.mx` y se copia a `dist/CNAME` en cada build, conservando el dominio al publicar con `gh-pages -d dist`.

La configuración del dominio, DNS y HTTPS se gestiona en GitHub Pages y el proveedor de DNS. Después de publicar, verificar la propiedad en Search Console, enviar su sitemap y comprobar redirecciones.

## Imágenes y funnel de resultados

Las cinco tarjetas originales de `assets/img` se publican en `public/results` y se asignan en `src/data/resultImages.ts`. Si se actualiza un diseño original, copiarlo también a `public/results` antes de compilar.

Las tarjetas originales ya tienen formato 9:16 de 1080 × 1920. El sitio las comparte y descarga directamente, sin redimensionarlas, enmarcarlas ni modificar su contenido. Los empates ofrecen una imagen por cada nube ganadora.

Cada combinación tiene una landing en `/test/resultado/...` con título, imagen Open Graph y CTA directo a «Haz tu test». Las páginas de resultado usan `noindex, follow` y no aparecen en el sitemap para evitar multiplicar combinaciones en la búsqueda.

WhatsApp, Facebook, X, Instagram y el menú nativo enlazan a la landing con `ref=share`, `utm_source` por plataforma, `utm_medium=story` o `post`, y `utm_campaign=share_cloud`. Para combinaciones, la vista previa Open Graph usa la primera nube; la landing muestra todas.

En iOS no se puede insertar automáticamente el sticker de enlace de Instagram. El tutorial inline guía al usuario para compartir o descargar la imagen, añadir el sticker y pegar la URL preparada. El menú nativo decide qué datos conserva; siempre quedan disponibles descarga y copia manual.

Los UTM preparan la atribución, pero no almacenan visitas por sí mismos. Google Analytics permitirá comparar fuente, medio y campaña cuando se conecte. Search Console mide rendimiento de búsqueda y no sustituye la analítica del funnel. No se identifica al participante.
