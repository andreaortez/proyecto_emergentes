import React from 'react';
import Portada from '../components/portada'
import UserName from '../components/userName'
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Proyecto {
    id: string;
    nombre: string;
}
export default function dashboard() {
    const userID = sessionStorage.getItem("user_id");
    const tipo = sessionStorage.getItem("tipo");
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [proyectoSelected, setProyecto] = useState<string>("");

    const [pyme_id, setPymeId] = useState<string | null>(null);
    const [inversionista_id, setInversionistaId] = useState<string | null>(null);

    useEffect(() => {
        if (tipo === "Inversionista") {
            setInversionistaId(sessionStorage.getItem("tipo_id"));
        } else {//pyme
            setPymeId(sessionStorage.getItem("tipo_id"));
        }
    }, [tipo]);

    useEffect(() => {
        const listProyectos = async () => {
            console.log("pyme " + pyme_id)
            try {
                const response = await axios.get('http://localhost:3001/ListarProyectos', {
                    params: { pyme_id }
                });

                console.log("repuesta " + response.data.proyectos)
                if (response.data.proyectos) {
                    setProyectos(response.data.proyectos.length > 0 ? response.data.proyectos.map((proyecto: any) => ({
                        id: proyecto._id,
                        nombre: proyecto.nombre
                    })) : []);
                }
            } catch (error) {
                console.error("Error al cargar los proyectos:", error);
            }
        };

        if (pyme_id) {
            listProyectos();
        } else {
            console.error("No se encontró el ID de la pyme en sessionStorage");
        }
    }, [pyme_id]);

    async function fetchProjectData(projectId: string) {
        try {
            const response = await axios(`http://localhost:3001/Graphs`, { params: { projectId } });
            if (response.data.result) {
                throw new Error('Error al obtener datos del proyecto');
            }
        } catch (error) {
            console.error('Error al llamar a la API:', error);
        }
    }

    const handleProyectoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProyecto(e.target.value);
    };

    return (
        <>
            <div className='vstack'>
                <Portada />
                <div className='p-4'>
                    <UserName />
                </div>
            </div>

            <div className='p-4 grafica'>
                <div>
                    <select className="form-select" value={proyectoSelected} onChange={handleProyectoChange} required >
                        <option value="" disabled>Elija un Proyecto...</option>
                        {proyectos.map((proyecto) => (
                            <option key={proyecto.id} value={proyecto.id}>
                                {proyecto.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <div className='estadisticas'>
                        <img
                            src="./imagenes/1.png"
                            alt="User Avatar"
                            width="40%"
                            height="40%"
                        />
                        <img
                            src="./imagenes/2.png"
                            alt="User Avatar"
                            width="40%"
                            height="40%"
                        />
                    </div>
                    <div className='estadisticas2'>
                        <img
                            src="./imagenes/3.png"
                            alt="User Avatar"
                            width="40%"
                            height="40%"
                        />
                        <img
                            src="./imagenes/4.png"
                            alt="User Avatar"
                            width="40%"
                            height="40%"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};