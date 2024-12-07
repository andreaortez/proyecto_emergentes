import React from 'react';

interface Inversionista {
    id: string;
    userId: string;
    nombre: string;
    apellido: string;
    avatar: string;
}

interface lista {
    user: Inversionista;
}

export default function InverstorsList({ user }: lista) {
    return (
        <div className="hstack w-100 justify-content-between">
            <img src={user.avatar}
                className="rounded-circle me-2"
                alt="avatar"
                width="50"
                height="50"
            />
            <div className="ms-2 me-auto mt-3">
                <div className="fw-bold">{user.nombre} {user.apellido}</div>
            </div>
        </div>
    );
};
