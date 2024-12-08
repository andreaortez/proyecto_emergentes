import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar-user';
import Navbar from './components/navbar-user';
import Dashboard from "./views/dashboard";
import Mensajeria from "./views/mensajeria";
import MiPerfil from "./views/miperfil";
import Proyectos from "./views/misproyectos";
import SearchProyects from "./views/searchProjects";
import CrearProyecto from "./views/crearProyecto";
import MiLista from './views/milista';
import axios from 'axios';

export default function Page() {
    const [currentView, setCurrentView] = useState("dashboard");
    const userId = sessionStorage.getItem('user_id');
    const tipo = sessionStorage.getItem("tipo");
    const [pyme_id, setPymeId] = useState<string | null>(null);
    const [investor_id, setInvestorId] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<string>("");

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
                        setInvestorId(sessionStorage.getItem("tipo_id"));
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
    }, [pyme_id, tipo]);

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

    useEffect(() => {
        if (investor_id) {
            getInvestorInfo();
        }
    }, [investor_id, tipo]);

    async function getInvestorInfo() {
        try {
            const response = await axios.get('http://localhost:3001/Inversionista', {
                params: { investor_id }
            });
            sessionStorage.setItem("nombre", response.data.investor.nombre);
            sessionStorage.setItem("apellido", response.data.investor.apellido);
        } catch (error) {
            console.error("Error al buscar el Inversionista:", error);
        }
    }

    return (
        <>
            <Navbar setCurrentView={setCurrentView}
                setSearchResults={setSearchResults} />

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
                        {currentView === "searchProyects" && <SearchProyects searchQuery={searchResults} />}
                        {currentView === "miLista" && <MiLista />}
                    </div>
                </div>
            </div>
        </>
    );
}