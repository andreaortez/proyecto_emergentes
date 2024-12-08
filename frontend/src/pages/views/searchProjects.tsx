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
    estado: number;
    empresa: string;
    inversionistas: Inversionista[];
    buttons?: React.ReactNode;
}

interface Inversionista {
    id: string;
    userId: string;
    nombre: string,
    apellido: string,
    avatar: string,
}

interface Props {
    searchQuery: string;
}

export default function Search({ searchQuery }: Props) {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [sector, setSector] = useState<string | null>(null);

    const tipo = sessionStorage.getItem("tipo");
    const [Pyme, setPyme] = useState<boolean>(false);
    const [Inversionista, setInversionista] = useState<boolean>(false);

    useEffect(() => {
        if (tipo === "Inversionista") {
            setPyme(false);
            setInversionista(true);
        } else {//pyme
            setPyme(true);
            setInversionista(false);
        }
    }, [tipo]);

    useEffect(() => {
        const listarProyectos = async () => {
            try {
                if (searchQuery.trim() === "") {
                    const response = await axios.get('http://localhost:3001/Proyectos');
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

                    // Si hay un sector seleccionado, filtra localmente
                    if (sector && sector !== "todos") {
                        setProyectos(
                            allProyectos.filter((proyecto) =>
                                proyecto.sector.toLowerCase() === sector.toLowerCase()
                            )
                        );
                    } else {
                        setProyectos(allProyectos);
                    }
                } else {
                    const response = await axios.get('http://localhost:3001/Search', {
                        params: { text: searchQuery },
                    });

                    setProyectos(response.data.proyectos || []);
                }
            } catch (error) {
                console.error("Error al cargar los proyectos:", error);
            }
        };

        listarProyectos();
    }, [sector, searchQuery]);

    return (
        <div className="vstack gap-3">
            <Tab Sectores={setSector} />
            {Pyme && <Proyectos proyectos={proyectos} editar={false} />}
            {Inversionista && <Proyectos proyectos={proyectos.map((proyecto) => ({
                ...proyecto,
                buttons: (
                    <button
                        key={proyecto.id}
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        onClick={() => {

                        }}
                    >
                        Agregar a Mi Lista
                    </button>
                )
            }))} editar={false} />}
        </div>
    );
};