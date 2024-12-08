import React from 'react';
import Chats from '../components/chats'
import Mensaje from '../components/mensajes'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Notificaciones {
    id: string;
    proposalId: string;
    mensaje: string;
    fecha: string;
    emisores: Emisor[];
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
    const [propuestas, setPropuestas] = useState<Notificaciones[]>([]);
    const pyme_id = sessionStorage.getItem("tipo_id");

    useEffect(() => {
        const listarPropuestas = async () => {
            try {
                console.log("pyme_id : ", pyme_id);
                const response = await axios.get('http://localhost:3001/MensajesP', {
                    params: { pyme_id }
                });

                console.log(response.data);
                setPropuestas(response.data.length > 0 ? response.data.map((notificacion: any) => ({
                    id: notificacion._id,
                    proposalId: notificacion.proposalId,
                    fecha: notificacion.fecha,
                    emisores: notificacion.emisores,
                    receptorid: notificacion.receptorid,
                })) : []);
            } catch (error) {
                console.error("Error al cargar las propuestas:", error);
            }
        };

        if (pyme_id) {
            listarPropuestas();
        } else {
            console.error("No se encontró el ID de la pyme");
        }
    }, [pyme_id]);

    return (
        <div className="components gap-4 d-flex">
            {/* Propuestas */}
            <div className="card" style={{ width: "30%", height: '40.4vw' }}>
                <div className="card-header">
                    <h5>Propuestas</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div>
                                {propuestas.length > 0 ? (
                                    propuestas.map((propuesta) => (
                                        <li key={propuesta.id} className="list-group-item list-group-item-action">
                                            <div>
                                                <ul className="list-unstyled">
                                                    {propuesta.emisores.map((emisor) => (
                                                        <li key={emisor.id} className="d-flex align-items-center mb-2">
                                                            <img
                                                                src={emisor.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                                                                alt={`${emisor.nombre} ${emisor.apellido}`}
                                                                className="rounded-circle"
                                                                width="40"
                                                                height="40"
                                                                style={{ marginRight: '10px' }}
                                                            />
                                                            <div>
                                                                <strong>{emisor.nombre} {emisor.apellido}</strong>
                                                                <br />
                                                                <small className="text-muted">{emisor.correo}</small>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <small className="text-muted">Fecha: {propuesta.fecha}</small>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <span className="text-muted">Sin notificaciones</span>
                                )}
                            </div>
                        </div>

                    </li>
                </ul>
            </div>
            <Mensaje />
        </div>
    );
};
