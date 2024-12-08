import React from 'react';
import UserProfile from '../components/userProfile'
import UserInformation from '../components/userInformation'
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Pyme {
    correo: string;
    telefono: string;
    direccion: string;
    monto?: string;
}

interface Inversionista {
    correo: string;
    telefono: string;
    direccion: string;
    monto: string;
}

export default function MiPerfil() {
    const user_id = sessionStorage.getItem("user_id");
    const tipo = sessionStorage.getItem("tipo");
    const [pyme, setPyme] = useState<Pyme | null>(null);
    const [inversionista, setInversionista] = useState<Inversionista | null>(null);

    const [Pyme, setPymeB] = useState<boolean>(false);
    const [Inversionista, setInversionistaB] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (tipo === "Inversionista") {
            setPymeB(false);
            setInversionistaB(true);
        } else {//pyme
            setPymeB(true);
            setInversionistaB(false);
        }
    }, [tipo]);

    useEffect(() => {
        if (user_id) {
            axios.post('http://localhost:3001/User', { user_id })
                .then(result => {
                    if (tipo === "Inversionista") {
                        const { correo, telefono, direccion, monto } = result.data;
                        setInversionista({
                            correo,
                            telefono,
                            direccion,
                            monto,
                        });
                    } else {
                        const { correo, telefono, direccion } = result.data;
                        setPyme({
                            correo,
                            telefono,
                            direccion,
                        });
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error al cargar la información del usuario:", error);
                    setIsLoading(false);
                });
        }
    }, [user_id]);

    if (isLoading) {
        return <p>Cargando información del usuario...</p>;
    }

    return (
        <div className="components gap-4 d-flex">
            <UserProfile flag={true} />
            {tipo === "Pyme" && pyme && <UserInformation correo={pyme.correo} telefono={pyme.telefono} direccion={pyme.direccion} />}

        </div >
    );
};
