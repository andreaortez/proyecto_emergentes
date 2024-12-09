import React from 'react';

interface Inversionista {
    id: string;
    nombre: string;
    apellido: string;
    avatar: string;
}

interface lista {
    user: Inversionista;
}

export default function InverstorsList({ user }: lista) {
    return (
        <div className="hstack w-100 d-flex align-items-center">
            <img src={user.avatar}
                className="rounded-circle me-2"
                alt="avatar"
                width="50"
                height="50"
            />
            <div className="ms-2 me-auto">
                <span className="fw-bold">{user.nombre} {user.apellido}</span>
            </div>
        </div>
    );
};
