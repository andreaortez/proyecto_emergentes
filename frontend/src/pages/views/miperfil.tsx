import React from 'react';
import UserProfile from '../components/userProfile'
import UserInformation from '../components/userInformation'
import axios from 'axios';
import { useEffect, useState } from 'react';

interface User {
    correo: string;
    telefono: string;
    direccion: string;
}

export default function MiPerfil() {
    const user_id = sessionStorage.getItem("user_id");
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (user_id) {
            axios
                .post('http://localhost:3001/User', { user_id })
                .then(result => {
                    const { correo, telefono, direccion } = result.data;
                    setUser({
                        correo,
                        telefono,
                        direccion
                    });
                })
        }
    }, [user_id]);

    if (!user) {
        return <p>Cargando información del usuario...</p>;
    }

    return (
        <div className="components gap-4 d-flex">
            <UserProfile flag={true} />
            <UserInformation correo={user.correo} telefono={user.telefono} direccion={user.direccion} />
        </div >
    );
};
