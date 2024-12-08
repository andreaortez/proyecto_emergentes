import React, { useState, useEffect } from 'react';

interface Parametros {
    setCurrentView: (view: string) => void;
}

export default function Sidebar({ setCurrentView }: Parametros) {
    const tipo_user = sessionStorage.getItem('tipo');
    const [Pyme, setPyme] = useState<boolean>(false);
    const [Inversionista, setInversionista] = useState<boolean>(false);

    useEffect(() => {
        if (tipo_user === "Pyme") {
            setPyme(true);
            setInversionista(false);
        } else {
            setPyme(false);
            setInversionista(true);
        }
    }, [tipo_user]);

    return (
        <div className="d-flex windowPadding ">
            <div
                id="sidebar"
                className="bg-light text-body-secondary p-3 border-top flex-grow"
                style={{ width: '220px', minHeight: '100vh' }}
            >
                <h4 className="text-center">Menú</h4>
                <nav className="nav flex-column text-body-secondary nav-pills">
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
                    {Pyme &&
                        <a className="nav-link nav-elements text-body-secondary d-flex align-items-center gap-2"
                            onClick={() => setCurrentView("propuestas")}
                        >
                            <img
                                src="/imagenes/propuesta.png"
                                alt="Mensajeria"
                                className="nav-icon"
                                width="20"
                                height="20"
                                id="propuestas"
                            />
                            Propuestas
                        </a>
                    }
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
                    {Pyme && (
                        <>
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
                            <nav className="nav nav-pills flex-column ">
                                <a className="nav-link ms-3 my-1 nav-elements text-body-secondary d-flex align-items-center gap-2"
                                    onClick={() => setCurrentView("crearProyectos")}
                                >
                                    <img
                                        src="/imagenes/crear.png"
                                        alt="Dashboard Icon"
                                        className="nav-icon"
                                        width="20"
                                        height="20"
                                        id="crear"
                                    />
                                    Crear Proyecto</a>
                            </nav>
                        </>
                    )}
                    {Inversionista && (
                        <>
                            <a
                                className="nav-link nav-elements text-body-secondary d-flex align-items-center gap-2"
                                onClick={() => setCurrentView("proyectos")}
                            >
                                <img
                                    src="/imagenes/usuarios-alt.png"
                                    alt="Seguimiento de Proyectos"
                                    className="nav-icon"
                                    width="20"
                                    height="20"
                                    id="seguimiento"
                                />
                                Seguimiento de Proyectos
                            </a>
                            <nav className="nav nav-pills flex-column ">
                                <a className="nav-link ms-3 my-1 nav-elements text-body-secondary d-flex align-items-center gap-2"
                                    onClick={() => setCurrentView("miLista")}
                                >
                                    <img
                                        src="/imagenes/milista.png"
                                        alt="Mi Lista"
                                        className="nav-icon"
                                        width="20"
                                        height="20"
                                        id="miLista"
                                    />
                                    Mi Lista
                                </a>
                            </nav>
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
};