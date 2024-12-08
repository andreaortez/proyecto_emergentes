import React, { useState, useEffect } from 'react';
import InverstorsList from '../components/investorsList';
import Iconos from '../elements/iconos';
import axios from 'axios';

interface Proyecto {
    nombre: string;
    imagen: string;
    sector: string;
    meta: number;
    descripcion: string;
    recaudado: string;
    estado: number;
    inversionistas: Inversionista[];
    onClose: () => void;
    footer?: React.ReactNode;
}

interface Inversionista {
    id: string;
    userId: string;
    nombre: string,
    apellido: string,
    avatar: string,
}

export default function verProyecto({ nombre, imagen, sector, meta, descripcion, recaudado, estado, inversionistas, onClose, footer }: Proyecto) {
    const [estadoString, setEstadoString] = useState<string>('');

    useEffect(() => {
        switch (estado) {
            case 1:
                setEstadoString("Proyecto Abierto");
                break;
            case 2:
                setEstadoString("Proyecto en Ejecución");
                break;
            case 3:
                setEstadoString("Proyecto Cerrado");
                break;
            default:
                setEstadoString("Estado desconocido");
                break;
        }
    }, [estado]);

    useEffect(() => {
        console.log("Inversionistas recibidos:", inversionistas);
    }, [inversionistas]);

    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className='hstack'>
                        {/* informacion */}
                        <div className="modal-body border-end col-md-7">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={`${imagen}`} alt="Imagen" className="img-fluid rounded-start" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <div className="hstack gap-2 d-flex align-items-center">
                                            <svg width="40" height="40">
                                                <circle cx="15" cy="15" r="15" fill="#15ae5d"></circle>
                                            </svg>
                                            <h5 className="card-text">{estadoString}</h5>
                                        </div>

                                        <h5 className="card-title">{`${nombre}`}</h5>
                                        <p className="card-text">Nombre de la empresa</p>

                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className='hstack justify-content-between'>
                                        <Iconos imagen={"./imagenes/objetivos.png"} texto={"L. " + `${meta}`} />
                                        <Iconos imagen={"./imagenes/mano.png"} texto={"L. " + `${recaudado}`} />
                                        <Iconos imagen={"./imagenes/dinero.png"} texto={`${sector}`} />
                                    </div>
                                    <p className="card-text"><small className="text-body-secondary">{`${descripcion}`}</small></p>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <img src="./imagenes/perfilRiesgo.png"
                                            alt="sector"
                                            width="70%"
                                            height="70%"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lista de inversionistas */}
                        <div className="container mt-4 col-md-5 justify-content-between">
                            <h2>Inversionistas</h2>
                            <p className="textColor">{inversionistas.length} inversionistas</p>
                            <div className="list-group" data-bs-spy="scroll">{/* falta hacerlo scroll */}
                                {inversionistas.length === 0 ? (
                                    <p>No existen inversionistas para este proyecto.</p>
                                ) : (
                                    inversionistas.map((inversionista) => (
                                        <InverstorsList
                                            key={inversionista.id}
                                            user={{
                                                nombre: inversionista.nombre,
                                                apellido: inversionista.apellido,
                                                id: inversionista.id,
                                                userId: inversionista.userId,
                                                avatar: inversionista.avatar
                                            }}
                                        />
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                    {footer && (
                        <div className="modal-footer">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};