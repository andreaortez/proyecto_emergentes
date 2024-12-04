import React from 'react';
import InverstorsList from '../components/investorsList';
import Iconos from '../components/iconos';

interface Proyecto {
    nombre: string;
    imagen: string;
    sector: string;
    meta: number;
    descripcion: string;
    recaudado: string;
    onClose: () => void;
    footer?: React.ReactNode;
}

export default function verProyecto({ nombre, imagen, sector, meta, descripcion, recaudado, onClose, footer }: Proyecto) {
    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className='hstack'>
                        {/* informarcion */}
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
                                            <h5 className="card-text">Proyecto abierto</h5>
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
                            <p className="textColor"># inversionistas</p>
                            <div className="list-group" data-bs-spy="scroll">{/* falta hacerlo scroll */}
                                <li className="list-group-item">
                                    <InverstorsList />
                                </li>
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