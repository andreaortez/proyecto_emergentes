import React from "react";
import PCard from './proyectoCard'

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

interface Lista {
    proyectos: Proyecto[];
    titulo?: string;
    editar: boolean;
}

interface Inversionista {
    id: string;
    userId: string;
    nombre: string,
    apellido: string,
    avatar: string,
}

export default function Proyectos({ proyectos, titulo, editar }: Lista) {
    return (
        <div className="card p-3">
            <div className="card-body">
                {titulo && <h5 className="card-title mb-4">{titulo}</h5>}
                {proyectos.map((proyecto) => (
                    <PCard
                        key={proyecto.id}
                        id={proyecto.id}
                        nombre={proyecto.nombre}
                        imagen={proyecto.imagen}
                        sector={proyecto.sector}
                        meta={proyecto.meta}
                        descripcion={proyecto.descripcion}
                        recaudado={proyecto.recaudado}
                        estado={proyecto.estado}
                        empresa={proyecto.empresa}
                        inversionistas={proyecto.inversionistas}
                        buttons={proyecto.buttons}
                        editar={editar}
                    />
                ))}
            </div>
        </div>
    )
}