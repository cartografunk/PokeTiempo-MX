import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MediaKit from './pages/MediaKit'
import Tienda from './pages/Tienda'
import Test from './pages/Test'
import useScrollToHash from './hooks/useScrollToHash'

function Layout() {
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
          <Link to="/media-kit">Media kit</Link>
          <Link to="/tienda">Tienda</Link>
          <Link to="/test">Test</Link>
          <a href="#contacto">Contacto</a>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media-kit" element={<MediaKit />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/test" element={<Test />} />
      </Routes>

      <footer className="footer" id="contacto">
        <div>
          <strong>Poketiempo MX</strong>
          <p>El tiempo en México para gente chidix</p>
        </div>
        <a className="button secondary" href="mailto:hola@poketiempo.mx">Contacto</a>
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
