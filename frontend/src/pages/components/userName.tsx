import React from 'react';
import { useEffect, useState } from 'react';

export default function Nombre() {
    const [avatar, setAvatar] = useState("https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png");
    const [nombre, setNombre] = useState("Nombre");
    const [apellido, setApellido] = useState("Apellido");
    const [rol, setRol] = useState("Rol");

    useEffect(() => {
        const userAvatar = sessionStorage.getItem("avatar");
        const userNombre = sessionStorage.getItem("nombre");
        const userApellido = sessionStorage.getItem("apellido");
        const userRol = sessionStorage.getItem("rol");

        if (userAvatar && userNombre && userApellido && userRol) {
            setAvatar(userAvatar);
            setNombre(userNombre);
            setApellido(userApellido);
            setRol(userRol);
        }
    }, []);

    return (
        <div className="card usuario-card">
            <div className="card-body d-flex gap-4">
                <img
                    src={avatar}
                    alt="User Avatar"
                    className="rounded-circle"
                    width="70"
                    height="70"
                />
                <div className="user-name  hstack gap-1">
                    <p className="mb-0">{nombre} {apellido}</p>
                    <span className='text-body-secondary fw-light'> - {rol}</span>
                </div>
            </div>
        </div>
    );
};