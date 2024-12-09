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
    const tipo = sessionStorage.getItem("tipo");
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [proyectoSelected, setProyecto] = useState<string>("");

    const [pyme_id, setPymeId] = useState<string | null>(null);
    const [investor_id, setInversionistaId] = useState<string | null>(null);

    const user_id = sessionStorage.getItem("user_id");

    useEffect(() => {
        if (tipo === "Inversionista") {
            setInversionistaId(sessionStorage.getItem("tipo_id"));
        } else {//pyme
            setPymeId(sessionStorage.getItem("tipo_id"));
        }
    }, [tipo, pyme_id, investor_id]);

    //listar proyectos para pymes
    useEffect(() => {
        const listProyectos = async () => {
            try {
                if (tipo === "Pyme") {
                    const response = await axios.get('http://localhost:3001/ListarProyectos', {
                        params: { pyme_id }
                    });

                    if (response.data.proyectos) {
                        setProyectos(response.data.proyectos.length > 0 ? response.data.proyectos.map((proyecto: any) => ({
                            id: proyecto._id,
                            nombre: proyecto.nombre
                        })) : []);
                    }
                } else {
                    const response = await axios.get('http://localhost:3001/ProyectosInversionista', {
                        params: { investor_id }
                    });

                    if (response.data.proyectos) {
                        setProyectos(response.data.proyectos.length > 0 ? response.data.proyectos.map((proyecto: any) => ({
                            id: proyecto._id,
                            nombre: proyecto.nombre
                        })) : []);
                    }
                }

            } catch (error) {
                console.error("Error al cargar los proyectos:", error);
            }
        };

        if (pyme_id || investor_id) {
            listProyectos();
        } else {
            console.error("No existe un pyme_id ");

        }
    }, [tipo, pyme_id, investor_id]);

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

                    </div>
                    <div className='estadisticas2'>

                    </div>
                </div>
            </div>
        </>
    );
};