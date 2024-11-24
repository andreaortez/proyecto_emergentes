import React from 'react';
import { useState } from 'react';
import Dashboard from "./dashboardPYME";
import Mensajeria from "./mensajeria";
import MiPerfil from "./miperfil";
import Proyectos from "./misproyectos";

export default function Sidebar() {
    const [currentView, setCurrentView] = useState("dashboard");

    const handleViewChange = (view: string) => {
        setCurrentView(view);
    };

    return (
        <>
            <div className="d-flex windowPadding">
                <div
                    id="sidebar"
                    className="bg-light text-body-secondary p-3 border-top"
                    style={{ width: '220px', height: '56.3vw' }}
                >
                    <h4 className="text-center">Menú</h4>
                    <ul className="nav flex-column text-body-secondary">
                        <li className="nav-item ">
                            <a className="nav-link nav-elements text-body-secondary d-flex align-items-center gap-2"
                                onClick={() => handleViewChange("dashboard")}
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
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-elements text-body-secondary d-flex align-items-center gap-2"
                                onClick={() => handleViewChange("mensajeria")}
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
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-elements text-body-secondary d-flex align-items-center gap-2"
                                onClick={() => handleViewChange("perfil")}
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
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-elements text-body-secondary d-flex align-items-center gap-2"
                                onClick={() => handleViewChange("proyectos")}
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
                        </li>
                    </ul>
                </div>


                {/* Contenido Principal */}
                <div className="d-flex">
                    {currentView === "dashboard" && <Dashboard />}
                    <div className="p-4">
                        {currentView === "mensajeria" && <Mensajeria />}
                        {currentView === "perfil" && <MiPerfil />}
                        {currentView === "proyectos" && <Proyectos />}
                    </div>
                </div>
            </div>
        </>
    );
};