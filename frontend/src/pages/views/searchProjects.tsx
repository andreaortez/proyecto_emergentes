import React from "react";
import Tab from '../components/filtros'
import Proyectos from '../components/listarProyectos'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Proyecto {
    id: string;
    nombre: string;
    imagen: string;
    sector: string;
    meta: number;
    descripcion: string;
    recaudado: string;
    buttons?: React.ReactNode;
}

export default function Search() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [sector, setSector] = useState<string | null>(null);

    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/Proyectos');

                console.log(response.data);
                const allProyectos: Proyecto[] = [
                    ...response.data.response.economía,
                    ...response.data.response.salud,
                    ...response.data.response.educación,
                    ...response.data.response.agrícola,
                    ...response.data.response.ganadería,
                    ...response.data.response.finanzas,
                    ...response.data.response.tecnología,
                    ...response.data.response.arte,
                ];

                if (sector) {
                    if (sector === "todos") {
                        setProyectos(allProyectos);
                    } else {
                        setProyectos(allProyectos.filter((proyecto) => proyecto.sector.toLowerCase() === sector));
                    }
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
            <Proyectos proyectos={proyectos} editar={false} />
        </div>
    );
};