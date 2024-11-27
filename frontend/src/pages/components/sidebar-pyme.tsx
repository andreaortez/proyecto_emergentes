import React from 'react';

interface Parametros {
    setCurrentView: (view: string) => void;
}

export default function Sidebar({ setCurrentView }: Parametros) {
    return (
        <div className="d-flex windowPadding ">
            <div
                id="sidebar"
                className="bg-light text-body-secondary p-3 border-top flex-grow"
                style={{ width: '220px', minHeight: '100vh' }}
            >
                <h4 className="text-center">Menú</h4>
                <nav className="nav flex-column text-body-secondary">
                    <a className="nav-link nav-elements text-body-secondary d-flex align-items-center gap-2"
                        onClick={() => setCurrentView("dashboard")}
                    >
                        <img
                            src="/imagenes/aplicaciones.png"
                            alt="Dashboard"
                            className="nav-icon"
                            width="20"
                            height="20"
                            id="dashboard"
                        />
                        Dashboard
                    </a>
                    <a className="nav-link nav-elements text-body-secondary d-flex align-items-center gap-2"
                        onClick={() => setCurrentView("mensajeria")}
                    >
                        <img
                            src="/imagenes/usuarios-alt.png"
                            alt="Mensajeria"
                            className="nav-icon"
                            width="20"
                            height="20"
                            id="chat"
                        />
                        Chat Inversores
                    </a>
                    <a className="nav-link nav-elements text-body-secondary d-flex align-items-center gap-2"
                        onClick={() => setCurrentView("perfil")}
                    >
                        <img
                            src="/imagenes/usuario.png"
                            alt="Dashboard Icon"
                            className="nav-icon"
                            width="20"
                            height="20"
                            id="miperfil"
                        />
                        Mi Perfil
                    </a>
                    <a className="nav-link nav-elements text-body-secondary d-flex align-items-center gap-2"
                        onClick={() => setCurrentView("proyectos")}
                    >
                        <img
                            src="/imagenes/plano.png"
                            alt="Dashboard Icon"
                            className="nav-icon"
                            width="20"
                            height="20"
                            id="proyectos"
                        />
                        Mis Proyectos
                    </a>
                </nav>
            </div>
        </div>
    );
};