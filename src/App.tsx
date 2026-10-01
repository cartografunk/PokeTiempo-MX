import { Helmet } from 'react-helmet-async'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MediaKit from './pages/MediaKit'
import Tienda from './pages/Tienda'
import Test from './pages/Test'
import Tests from './pages/Tests'
import SharedResult from './pages/SharedResult'
import useScrollToHash from './hooks/useScrollToHash'

export function Layout() {
  useScrollToHash()

  return (
    <main>
      <nav className="topbar" aria-label="Navegacion principal">
        <Link className="brand" to="/" aria-label="Poketiempo MX inicio">
          <span className="brand-mark">PT</span>
          <span>Poketiempo MX</span>
        </Link>
        <div className="nav-links">
          <Link to="/#intro">Proyecto</Link>
          <Link to="/media-kit#colaboraciones">Colaboraciones</Link>
          <Link to="/tienda">Tienda</Link>
          <Link to="/tests">Tests</Link>
          <Link to="/#contacto">Contacto</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media-kit" element={<MediaKit />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test/resultado/:slug" element={<SharedResult />} />
      <Route path="*" element={<section className="section"><Helmet><title>Página no encontrada | Poketiempo MX</title><meta name="robots" content="noindex" /></Helmet><h1 className="quiz-title">Página no encontrada</h1><Link className="button secondary" to="/">Volver al inicio</Link></section>} />
      </Routes>

      <footer className="footer">
        <div>
          <strong>Poketiempo MX</strong>
          <p>El tiempo en México para gente chidix</p>
        </div>
        <Link
          className="button secondary"
          to="/#contacto"
          aria-label="Ir a la sección de contacto"
        >
          Contacto
        </Link>
      </footer>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout />
    </BrowserRouter>
  )
}

export default App
