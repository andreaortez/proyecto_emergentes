import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="./imagenes/logo.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
            <span className="navbar-brand mb-0 h1 ms-2">$YUPI</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav ms-auto">
              <a className="nav-link" href="#sobre-nosotros">Sobre Nosotros</a>
              <a className="nav-link" href="#como-funciona">Cómo Funciona</a>
              <a className="nav-link" href="#contactanos">Contáctanos</a>
              <Link href="/IniciarSesion" className="nav-link">Iniciar Sesión</Link>
              <a className="nav-link border-start">Registrarse como</a>
            </div>
            <button className="btn pageButton me-2" type="button">
              <Link href="/RegistroP" className="nav-link">PYME</Link>
            </button>
            <button className="btn pageButton" type="button">
              <Link href="/RegistroI" className="nav-link">Inversionista</Link>
            </button>
          </div>
        </div>
      </nav >
    </>
  )
}