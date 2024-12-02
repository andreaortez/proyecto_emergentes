import React from "react";

interface Sectores {
    Sectores: (sector: string) => void;
}

export default function Tab({ Sectores }: Sectores) {
    return (
        <nav className="navbar nav-underline navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link underline" onClick={() => Sectores('todos')}>Todos</a>
                        <a className="nav-link" onClick={() => Sectores('economía')}>Economía</a>
                        <a className="nav-link" onClick={() => Sectores('salud')}>Salud</a>
                        <a className="nav-link" onClick={() => Sectores('educación')}>Educación</a>
                        <a className="nav-link" onClick={() => Sectores('agrícola')}>Agrícola</a>
                        <a className="nav-link" onClick={() => Sectores('ganadería')}>Ganadería</a>
                        <a className="nav-link" onClick={() => Sectores('finanzas')}>Finanzas</a>
                        <a className="nav-link" onClick={() => Sectores('tecnología')}>Tecnología</a>
                        <a className="nav-link" onClick={() => Sectores('arte')}>Arte</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}