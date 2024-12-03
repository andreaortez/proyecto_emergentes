import React from 'react';

interface inversionistas {
    nombre: string;
    avatar: string;
}

export default function InverstorsList() {
    return (
        <div className="hstack w-100 justify-content-between">
            <img src="https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png"
                className="rounded-circle me-2"
                alt="avatar"
                width="50"
                height="50"
            />
            <div className="ms-2 me-auto mt-3">
                <div className="fw-bold">Nombre</div>
                <p className='text-body-secondary'>Dia de inversion</p>
            </div>
            <button className="btn btn2">Ver Perfil</button>
        </div>
    );
};
