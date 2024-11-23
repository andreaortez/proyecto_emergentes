import React from 'react';

export default function Mensajes() {
    return (
        <>
            <div className="mensajeria">
                <div className="card" style={{ width: "30%" }}>
                    <div className="card-header">
                        <h5>Mis conversaciones</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img
                                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                    alt="User Avatar"
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                    style={{ marginRight: '10px' }}
                                />
                                <div>
                                    <strong>Usuario 1</strong>
                                    <p className="mb-0 text-muted">Gracias por tu ayuda.</p>
                                </div>
                            </div>
                            <small className="text-muted">Ayer</small>
                        </li>
                        <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img
                                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                    alt="User Avatar"
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                    style={{ marginRight: '10px' }}
                                />
                                <div>
                                    <strong>Usuario 2</strong>
                                    <p className="mb-0 text-muted">Gracias por tu ayuda.</p>
                                </div>
                            </div>
                            <small className="text-muted">Ayer</small>
                        </li>
                        <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img
                                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                    alt="User Avatar"
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                    style={{ marginRight: '10px' }}
                                />
                                <div>
                                    <strong>Usuario 3</strong>
                                    <p className="mb-0 text-muted">Gracias por tu ayuda.</p>
                                </div>
                            </div>
                            <small className="text-muted">Ayer</small>
                        </li>
                    </ul>
                </div>

                <div className="card" style={{ width: "43.5%" }}>
                    <div className="card-header">
                        <div className="d-flex align-items-center">
                            <img
                                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                alt="User Avatar"
                                className="rounded-circle"
                                width="40"
                                height="40"
                                style={{ marginRight: '10px' }}
                            />
                            <div>
                                <h5>Sender name</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ height: "300px", overflowY: "auto" }}>
                        <div className="d-flex align-items-start mb-3">
                            <img src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-circle me-3" alt="Usuario 1" style={{ width: "40px", height: "40px" }} />
                            <div className="message p-2 rounded bg-light">
                                Hola, ¿cómo estás?
                            </div>
                        </div>

                        <div className="d-flex align-items-start justify-content-end mb-3">
                            <div className="message p-2 rounded bg-light">
                                ¡Estoy bien, gracias por preguntar!
                            </div>
                            <img src="https://randomuser.me/api/portraits/women/1.jpg" className="rounded-circle ms-3" alt="Usuario 2" style={{ width: "40px", height: "40px" }} />
                        </div>

                        <div className="d-flex align-items-start mb-3">
                            <img src="https://randomuser.me/api/portraits/men/1.jpg" className="rounded-circle me-3" alt="Usuario 1" style={{ width: "40px", height: "40px" }} />
                            <div className="message p-2 rounded bg-light">
                                ¿Qué tal tu día?
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Escribe un mensaje..." />
                            <button className="btn btn2">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
