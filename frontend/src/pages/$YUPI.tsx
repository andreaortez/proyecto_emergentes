import React, { useState } from 'react';
import Sidebar from './components/sidebar-user';
import Navbar from './components/navbar-user';
import Dashboard from "./views/dashboardPYME";
import Mensajeria from "./views/mensajeria";
import MiPerfil from "./views/miperfil";
import Proyectos from "./views/misproyectos";
import SearchProyects from "./views/searchProjects";
import CrearProyecto from "./views/crearProyecto";

export default function Page() {
    const [currentView, setCurrentView] = useState("dashboard");
    const userId = sessionStorage.getItem('user_id');

    if (!userId) {
        return <p>Se está cargando el contenido</p>;
    }

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
                        {currentView === "crearProyectos" && <CrearProyecto />}
                        {currentView === "searchProyects" && <SearchProyects />}
                    </div>
                </div>
            </div>
        </>
    );
}