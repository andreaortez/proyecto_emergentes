import React from 'react';
import Chats from '../components/chats'
import Mensaje from '../components/mensajes'
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    const [propuestas, setPropuestas] = useState<Propuestas | null>(null);

    useEffect(() => {
        const listarPropuestas = async () => {
            try {
                console.log("user_id : ", user_id);
                const response = await axios.get('http://localhost:3001/Mensajes', {
                    params: { user_id }
                });

                console.log(response.data.mensajes);
                if (response.data.mensajes) {
                    setPropuestas({
                        id: response.data.mensajes._id,
                        proposalId: response.data.mensajes.proposalId,
                        fecha: response.data.mensajes.fecha,
                        emisores: response.data.mensajes.emisor,
                        receptorid: response.data.mensajes.receptor,
                        mensaje: response.data.mensajes.mensaje,
                    });
                } else {
                    setPropuestas(null);
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

    return (
        <div className="components gap-4 d-flex">
            {/* Propuestas */}
            <div className="card" style={{ width: "77.8%", height: '40.4vw' }}>
                <div className="card-header">
                    <h5>Propuestas</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center p-1 mt-2">
                            {propuestas ? (
                                <li key={propuestas.id} className="list-group-item list-group-item-action">
                                    <div className="p-2">
                                        <div className="d-flex align-items-center mb-2">
                                            <img
                                                src={propuestas.emisores.avatar}
                                                alt={`${propuestas.emisores.nombre} ${propuestas.emisores.apellido}`}
                                                className="rounded-circle"
                                                width="40"
                                                height="40"
                                                style={{ marginRight: '10px' }}
                                            />
                                            <strong>{propuestas.emisores.nombre} {propuestas.emisores.apellido}</strong>
                                            <button className='btn ms-auto'>
                                                <img src="./imagenes/aceptar.png"
                                                    alt="aceptar"
                                                    width="25px"
                                                    height="25px"
                                                    className='mb-3'
                                                />
                                            </button>
                                            <button className='btn '>
                                                <img src="./imagenes/rechazar.png"
                                                    alt="rechazar"
                                                    width="20px"
                                                    height="20px"
                                                    className='mb-3'
                                                />
                                            </button>
                                        </div>
                                        <p>{propuestas.mensaje}</p>
                                        <small className="text-muted">Fecha: {propuestas.fecha}</small>
                                    </div>
                                </li>
                            ) : (
                                <span className="text-muted">No tiene propuestas pendientes.</span>
                            )}
                        </div>

                    </li>
                </ul>
            </div>
        </div>
    );
};
