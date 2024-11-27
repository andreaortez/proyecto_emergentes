import React from "react";

export default function Tab() {
    return (
        <nav className="navbar nav-underline navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link underline" href="#">Economía</a>
                        <a className="nav-link" href="#">Salud</a>
                        <a className="nav-link" href="#">Educación</a>
                        <a className="nav-link">Agrícola</a>
                        <a className="nav-link" href="#">Ganadería</a>
                        <a className="nav-link">Finanzas</a>
                        <a className="nav-link" href="#">Tecnología</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}