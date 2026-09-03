import { useEffect } from 'react'

/**
 * Actualiza document.title por pagina. Sin dependencias extra (react-helmet
 * no es necesario para algo tan simple en una SPA sin SSR).
 * Pasar el titulo completo, ej: 'Media kit | Poketiempo MX'.
 */
function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}

export default usePageTitle
