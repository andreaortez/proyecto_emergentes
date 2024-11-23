import React from 'react';
import { useState } from 'react';
import Dashboard from "./dashboardPYME";
import Mensajeria from "./mensajeria";
//import MiPerfil from "./components/MiPerfil";

export default function Sidebar() {
    const [currentView, setCurrentView] = useState("dashboard");

    const handleViewChange = (view: string) => {
        setCurrentView(view);
    };

    return (
        <>
            <div className="d-flex">
                <div
                    id="sidebar"
                    className="bg-light text-dark p-3 border-top"
                    style={{ height: '90vh', width: '250px' }}
                >
                    <h4 className="text-center">Menú</h4>
                    <ul className="nav flex-column">
                        <li className="nav-item ">
                            <a className="nav-link nav-elements"
                                onClick={() => handleViewChange("dashboard")}
                            >
                                <img
                                    src="/imagenes/monitor.png"
                                    alt="Dashboard Icon"
                                    className="nav-icon gap"
                                    width="20"
                                    height="20"
                                />
                                Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-elements"
                                onClick={() => handleViewChange("mensajeria")}
                            >
                                <img
                                    src="/imagenes/usuarios-alt.png"
                                    alt="Dashboard Icon"
                                    className="nav-icon gap"
                                    width="20"
                                    height="20"
                                />
                                Chat Inversores
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-elements"
                                onClick={() => handleViewChange("dashboard")}
                            >
                                <img
                                    src="/imagenes/usuario.png"
                                    alt="Dashboard Icon"
                                    className="nav-icon gap"
                                    width="20"
                                    height="20"
                                />
                                Mi Perfil
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-elements"
                                onClick={() => handleViewChange("dashboard")}
                            >
                                <img
                                    src="/imagenes/usuarios-alt.png"
                                    alt="Dashboard Icon"
                                    className="nav-icon gap"
                                    width="20"
                                    height="20"
                                />
                                Mis Proyectos
                            </a>
                        </li>
                    </ul>
                </div>
                {/* Contenido Principal */}
                <div className="flex-grow-1 p-4">
                    {currentView === "dashboard" && <Dashboard />}
                    {currentView === "mensajeria" && <Mensajeria />}
                    {/*{currentView === "perfil" && <MiPerfil />}*/}
                    {/*{currentView === "proyecots" && <Proyectos />}*/}
                </div>
            </div>
        </>
    );
};