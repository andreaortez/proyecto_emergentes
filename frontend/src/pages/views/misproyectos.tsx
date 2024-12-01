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
                //console.log("pyme_id desde sessionStorage:", pyme_id);
                const response = await axios.get('http://localhost:3001/ProyectosPyme', {
                    params: { pyme_id }
                });
                if (response.data.length > 0) {
                    setProyectos(response.data);
                } else {
                    console.warn("No hay proyectos para este pyme_id.");
                    setProyectos([]);
                }
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
                        {proyectos.length > 0 ? (//imprime los proyectos
                            proyectos.map((proyecto, index) => (
                                <div className="col" key={index}>
                                    <PCard
                                        nombre={proyecto.nombre}
                                        imagen={proyecto.imagen}
                                        meta={proyecto.meta}
                                        descripcion={proyecto.descripcion}
                                        recaudado={proyecto.recaudado}
                                    />
                                </div>
                            ))
                        ) : (//si no hay proyectos imprime un mensaje
                            <p>No tienes proyectos para mostrar.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};