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

Los enlaces de correo hola@poketiempo.mx siguen siendo pendientes hasta configurar dominio y correo. Las tarjetas sociales usan hero.png provisionalmente; sustituirlas al terminar los diseños. SEO y Search Console no identifican personas que realizan el test; la analítica de eventos se configura por separado.

## Imágenes y compartir resultados

El resultado muestra una tarjeta provisional hasta cargar los diseños. Colocar las imágenes PNG/JPG en public/results y asignarlas en src/data/resultImages.ts: A=Cirrus, B=Cumulonimbus, C=Cumulus, D=Stratus, E=Altocumulus. Las diez parejas usan las claves AB, AC, AD, AE, BC, BD, BE, CD, CE, DE. Los empates múltiples sin diseño conservan la tarjeta provisional.

WhatsApp y Facebook comparten el enlace del test con parámetros UTM por canal. No comparten aún una página o vista previa por resultado. Historias de Instagram se habilita al asignar la imagen; usa el menú nativo del dispositivo, sin garantizar que Instagram esté entre las opciones. Se ofrece descarga alternativa. Abrir el menú no confirma una publicación.

No hay proveedor de analítica conectado: los parámetros UTM preparan la atribución, pero por sí solos no guardan visitas ni eventos. Search Console tampoco sustituye la medición del cuestionario.
