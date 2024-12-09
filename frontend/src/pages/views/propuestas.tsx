import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../modals/modal';

interface Propuestas {
    id: string;
    proposalId: string;
    mensaje: string;
    fecha: string;
    emisores: Emisor;
    receptorid: string;
}

interface Emisor {
    id: string;
    avatar: string;
    contraseña: string;
    correo: string;
    telefono: string;
    nombre: string;
    apellido: string;
}

export default function Mensajes() {
    const user_id = sessionStorage.getItem("user_id");
    const [propuestas, setPropuestas] = useState<Propuestas[]>([]);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const listarPropuestas = async () => {
            try {
                console.log("user_id : ", user_id);
                const response = await axios.get('http://localhost:3001/Mensajes', {
                    params: { user_id }
                });

                console.log(response.data.mensajes);
                if (Array.isArray(response.data.mensajes)) {
                    setPropuestas(response.data.mensajes.map((mensaje: any) => ({
                        id: mensaje._id,
                        proposalId: mensaje.proposalId,
                        fecha: mensaje.fecha,
                        emisores: mensaje.emisor,
                        receptorid: mensaje.receptor,
                        mensaje: mensaje.mensaje,
                    })));
                } else {
                    setPropuestas([]);
                }

                console.log(response.data.mensajes.emisor);
            } catch (error) {
                console.error("Error al cargar las propuestas:", error);
            }
        };

        if (user_id) {
            listarPropuestas();
        } else {
            console.error("No se encontró el ID de la pyme");
        }
    }, [user_id]);

    const aceptarPropuesta = async (proposalId: string) => {
        try {
            console.log("proposalID : ", proposalId);
            const response = await axios.post('http://localhost:3001/aceptarPropuesta', { proposal_id: proposalId }
            ).then(response => {
                // Éxito
                setTitle('¡Éxito!');
                setMessage("Se ha aceptado la propuesta con éxito.");
                setShowModal(true);
            });

        } catch (error) {
            setTitle('¡Error!');
            setMessage('Ocurrió un problema al aceptar la propuesta. Inténtalo nuevamente.');
            setShowModal(true);
        }
    };

    const rechazarPropuesta = async (proposalId: string) => {
        try {
            console.log("proposalID : ", proposalId);
            const response = await axios.post('http://localhost:3001/rechazarPropuesta', { proposal_id: proposalId }
            ).then(response => {
                // Éxito
                setTitle('¡Éxito!');
                setMessage("Se ha rechazado la propuesta con éxito.");
                setShowModal(true);
            });

        } catch (error) {
            setTitle('¡Error!');
            setMessage('Ocurrió un problema al rechazar la propuesta. Inténtalo nuevamente.');
            setShowModal(true);
        }
    };

    return (
        <>
            <div className="components gap-4 d-flex">
                {/* Propuestas */}
                <div className="card" style={{ width: "77.8%", height: '45.5vw', overflowY: 'auto' }}>
                    <div className="card-header">
                        <h5>Propuestas</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center p-1 mt-2 mb-2 vstack">
                                {propuestas.length > 0 ? (
                                    propuestas.map((propuesta) => (
                                        <li key={propuesta.id} className="list-group-item list-group-item-action">
                                            <div className="p-2">
                                                <div className="d-flex align-items-center mb-2">
                                                    <img
                                                        src={propuesta.emisores.avatar}
                                                        alt={`${propuesta.emisores.nombre} ${propuesta.emisores.apellido}`}
                                                        className="rounded-circle"
                                                        width="40"
                                                        height="40"
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                    <strong>{propuesta.emisores.nombre} {propuesta.emisores.apellido}</strong>
                                                    <button className='btn ms-auto' onClick={() => aceptarPropuesta(propuesta.proposalId)}>
                                                        <img src="./imagenes/aceptar.png"
                                                            alt="aceptar"
                                                            width="25px"
                                                            height="25px"
                                                            className='mb-3'
                                                        />
                                                    </button>
                                                    <button className='btn' onClick={() => rechazarPropuesta(propuesta.proposalId)}>
                                                        <img src="./imagenes/rechazar.png"
                                                            alt="rechazar"
                                                            width="20px"
                                                            height="20px"
                                                            className='mb-3'
                                                        />
                                                    </button>
                                                </div>
                                                <p>{propuesta.mensaje}</p>
                                                <small className="text-muted">Fecha: {propuesta.fecha}</small>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <span className="text-muted">No tiene propuestas pendientes.</span>
                                )}
                            </div>

                        </li>
                    </ul>
                </div>
            </div>

            {/* Modal */}
            {showModal && <Modal title={title} message={message} onClose={() => setShowModal(false)} />}
        </>
    );
};
