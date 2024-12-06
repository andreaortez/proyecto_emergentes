import VerProyecto from "../modals/verProyecto";
import { useState } from 'react';
import EditarProyecto from "../modals/editarProyecto";

interface Proyecto {
    id: string;
    nombre: string;
    imagen: string;
    sector: string;
    meta: number;
    descripcion: string;
    recaudado: string;
    estado: number;
    inversionistas: Inversionista[];
    buttons?: React.ReactNode;
    editar: boolean;
}

interface Inversionista {

}

export default function ProyectoCard({ id, nombre, imagen, sector, meta, descripcion, recaudado, estado, inversionistas, buttons, editar }: Proyecto) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    return (
        <>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="hstack">
                        <div className="d-flex justify-content-center align-items-center" style={{ width: '200px', height: '200px' }}>
                            <img src={`${imagen}`} alt="Imagen"
                                style={{ objectFit: 'cover', height: '100%' }} />
                        </div>
                        <div className="card-body">
                            <div className='hstack'>
                                <h5 className="card-title">{`${nombre}`}</h5>
                                {editar && (
                                    <a className='ms-auto' onClick={() => setShowEditModal(true)}>
                                        <img src="./imagenes/editar.png"
                                            alt="editar"
                                            width="20px"
                                            height="20px"
                                            className='mb-3'
                                        />
                                    </a>)}
                            </div>
                            <p className="card-text">{`${descripcion}`}</p>
                            <div className='hstack gap-3 mt-3'>
                                <button type="button" className="btn btn2 rounded-pill" onClick={() => setShowModal(true)}>Ver Proyecto</button>
                                {buttons && buttons}
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Ver Proyecto*/}
            {showModal && <VerProyecto nombre={nombre} imagen={imagen} sector={sector} meta={meta} descripcion={descripcion} recaudado={recaudado} estado={estado} inversionistas={inversionistas} onClose={() => setShowModal(false)} />}

            {/* Editar Proyecto*/}
            {showEditModal && <EditarProyecto project_id={id} nombre={nombre} imagen={imagen} sector={sector} meta={meta} descripcion={descripcion} onClose={() => setShowEditModal(false)} />}
        </>
    );
};