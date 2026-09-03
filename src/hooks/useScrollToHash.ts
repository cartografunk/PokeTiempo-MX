import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Al navegar a una ruta con hash (ej. /media-kit#colaboraciones), hace scroll
 * al elemento correspondiente. React Router no hace esto automaticamente en
 * navegacion client-side (a diferencia de un <a href="#ancla"> nativo).
 */
function useScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }

    const id = hash.replace('#', '')
    // Se espera un tick a que el DOM de la nueva pagina este montado.
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 0)

    return () => window.clearTimeout(timer)
  }, [hash, pathname])
}

export default useScrollToHash
