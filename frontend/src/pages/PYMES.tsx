import React from 'react';
import Sidebar from './components/sidebar-pyme'
import Navbar from './components/navbar-pyme'
import { useState } from 'react';
import Dashboard from "./views/dashboardPYME";
import Mensajeria from "./views/mensajeria";
import MiPerfil from "./views/miperfil";
import Proyectos from "./views/misproyectos";
import SearchProyects from "./views/searchProjects";

export default function BackgroundText() {
    const [currentView, setCurrentView] = useState("dashboard");

    return (
        <>
            <Navbar setCurrentView={setCurrentView} />

            <div className="d-flex">
                <Sidebar setCurrentView={setCurrentView} />
                {/* Contenido Principal */}
                <div className="windowPadding">
                    {currentView === "dashboard" && <Dashboard />}
                    <div className="p-4">
                        {currentView === "mensajeria" && <Mensajeria />}
                        {currentView === "perfil" && <MiPerfil />}
                        {currentView === "proyectos" && <Proyectos />}
                        {currentView === "searchProyects" && <SearchProyects />}
                    </div>
                </div>
            </div>
        </>
    );
};