import React from "react";
import Tab from '../components/filtros'
import Proyectos from '../components/listarProyectos'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../modals/modal'

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

export default function Search() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [sector, setSector] = useState<string | null>(null);

    const tipo = sessionStorage.getItem("tipo");
    const [pyme_id, setPymeId] = useState<string | null>(null);
    const [investor_id, setInvestorId] = useState<string | null>(null);
    const [Pyme, setPyme] = useState<boolean>(false);
    const [Inversionista, setInversionista] = useState<boolean>(false);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleFavorite = async (project_id: string) => {
        try {
            //console.log("pyme_id desde sessionStorage:", pyme_id);
            console.log(project_id)
            console.log("Inversionista", investor_id)

            await axios.post('http://localhost:3001/agregarFavoritos', {
                project_id,
                investor_id: investor_id

            }).then(response => {
                // Éxito
                console.log(response.status);
                setTitle('Proyecto Agregado');
                setMessage('Proyecto agregado a Mi Lista.');
                setShowModal(true);
            });

        } catch (error) {
            setTitle('Error al agregar proyecto');
            setMessage('Ocurrió un problema al agregar proyecto. Inténtalo nuevamente.');
            setShowModal(true);
        }
    }

    useEffect(() => {
        if (tipo === "Inversionista") {
            setInvestorId(sessionStorage.getItem("tipo_id"));
        } else {//pyme
            setPymeId(sessionStorage.getItem("tipo_id"));
        }
    }, [tipo]);



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

        listarProyectos();
    }, [sector]);
    console.log("Proyectos:", proyectos)

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
                            console.log("IdProject", proyecto.id);
                            handleFavorite(proyecto.id)
                        }}
                    >
                        Agregar a Mi Lista
                    </button>
                )
            }))} editar={false} />}
            {/* Modal */}
            {showModal && <Modal title={title} message={message} onClose={() => setShowModal(false)} />}
        </div>
    );
};