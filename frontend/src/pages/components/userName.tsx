import React from 'react';

export default function Nombre() {
    return (
        <div className="card usuario-card">
            <div className="card-body d-flex gap-4">
                <img
                    src="https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png"
                    alt="User Avatar"
                    className="rounded-circle"
                    width="70"
                    height="70"
                />
                <div className="user-name  hstack gap-1">
                    <p className="mb-0">Nombre del Usuario</p>
                    <span className='text-body-secondary fw-light'> - Rol</span>
                </div>
            </div>
        </div>
    );
};