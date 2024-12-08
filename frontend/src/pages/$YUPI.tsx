import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar-user';
import Navbar from './components/navbar-user';
import Dashboard from "./views/dashboard";
import Mensajeria from "./views/mensajeria";
import MiPerfil from "./views/miperfil";
import Proyectos from "./views/misproyectos";
import SearchProyects from "./views/searchProjects";
import CrearProyecto from "./views/crearProyecto";
import axios from 'axios';

export default function Page() {
    const [currentView, setCurrentView] = useState("dashboard");
    const userId = sessionStorage.getItem('user_id');
    const tipo = sessionStorage.getItem("tipo");
    const [pyme_id, setPymeId] = useState<string | null>(null);
    const [inversionista_id, setInversionistaId] = useState<string | null>(null);

    if (!userId) {
        return <p>Se está cargando el contenido</p>;
    }

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                let url = "http://localhost:3001/User";

                //console.log("user_id in PymeDash:", userID);
                const result = await axios.post(url, { user_id: userId });

                if (result.status === 200) {
                    if (tipo === "Inversionista") {
                        sessionStorage.setItem('nombre', result.data.nombre);
                        sessionStorage.setItem('apellido', result.data.apellido);
                    } else {//pyme
                        setPymeId(sessionStorage.getItem("tipo_id"));
                    }
                    sessionStorage.setItem('avatar', result.data.avatar);
                }
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
            }
        }

        if (userId) {
            cargarDatos();
        } else {
            console.error("No se encontro el ID del usuario");
        }
    }, [userId]);

    useEffect(() => {
        if (pyme_id) {
            getPymeInfo();
        }
    }, [pyme_id]);

    async function getPymeInfo() {
        try {
            const response = await axios.get('http://localhost:3001/Pyme', {
                params: { pyme_id }
            });
            sessionStorage.setItem("nombre", response.data.pyme.empresa);
        } catch (error) {
            console.error("Error al buscar la Pyme:", error);
        }
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