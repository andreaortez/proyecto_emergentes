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
    const [sector, setSector] = useState<string | null>(null);

    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/Proyectos');

                const allProyectos: Proyecto[] = [
                    ...response.data.economia,
                    ...response.data.salud,
                    ...response.data.educacion,
                    ...response.data.agricola,
                    ...response.data.ganaderia,
                    ...response.data.finanzas,
                    ...response.data.tecnologia,
                ];

                if (sector) {
                    setProyectos(allProyectos.filter((proyecto) => proyecto.sector.toLowerCase() === sector));
                } else {
                    setProyectos(allProyectos);
                }

            } catch (error) {
                console.error("Error al cargar los proyectos:", error);
            }
        };

        fetchProyectos();
    }, [sector]);

    return (
        <div className="vstack gap-3">
            <Tab Sectores={setSector} />
            <Proyectos proyectos={proyectos} />
        </div>
    );
};