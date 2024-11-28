import React from "react";
import Tab from '../components/filtros'
import Proyectos from '../components/listarProyectos'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Proyecto {
    nombre: string;
    imagen: string;
    sector: string;
    descripcion: string;
}

export default function Search() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const pyme_id = sessionStorage.getItem("tipo_id");

    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/Proyectos');
                setProyectos(response.data);
            } catch (error) {
                console.error("Error al cargar los proyectos:", error);
            }
        };

        if (pyme_id) {
            fetchProyectos();
        } else {
            console.error("No se encontró el ID de la pyme en sessionStorage");
        }
    }, [pyme_id]);

    return (
        <div className="vstack gap-3">
            <Tab />
            <Proyectos proyectos={proyectos} />
        </div>
    );
};