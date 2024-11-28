import React from "react";
import PCard from './proyectoCard2'

interface Proyecto {
    nombre: string;
    imagen: string;
    sector: string;
    descripcion: string;
}

interface Lista {
    proyectos: Proyecto[];
}

export default function Proyectos({ proyectos }: Lista) {
    return (
        <div className="card p-3">
            <div className="card-body">
                {proyectos.map((proyecto, index) => (
                    <PCard
                        key={index}
                        nombre={proyecto.nombre}
                        imagen={proyecto.imagen}
                        sector={proyecto.sector}
                        descripcion={proyecto.descripcion}
                    />
                ))}
            </div>
        </div>
    )
}