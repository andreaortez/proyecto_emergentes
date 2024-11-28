import react from 'react'
import PCard from '../components/proyectoCard'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Proyecto {
    nombre: string;
    imagen: string;
    meta: number;
    descripcion: string;
    recaudado: number;
}

export default function MisProyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const pyme_id = sessionStorage.getItem("tipo_id");

    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                console.log("prueba3")
                console.log(pyme_id);
                const response = await axios.get('http://localhost:3001/ProyectosPyme', {
                    params: { pyme_id }
                });
                setProyectos(response.data);
                console.log(response.data);
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
        <div className="components">
            <div className="card" style={{ width: "77.8%" }}>
                <div className="card-body">
                    <h5 className="card-title mb-4">Mis Proyectos</h5>
                    <div className='row'>
                        {proyectos.map((proyecto, index) => (
                            <div className="col" key={index}>
                                <PCard nombre={proyecto.nombre}
                                    imagen={proyecto.imagen}
                                    meta={proyecto.meta}
                                    descripcion={proyecto.descripcion}
                                    recaudado={proyecto.recaudado}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};