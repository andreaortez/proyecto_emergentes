import React from 'react';

export default function Chat() {
    return (
        <div className="card" style={{ width: "30%", height: '40.4vw' }}>
            <div className="card-header">
                <h5>Notificaciones</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <img
                            src="https://randomuser.me/api/portraits/men/1.jpg"
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
            </ul>
        </div>
    );
};