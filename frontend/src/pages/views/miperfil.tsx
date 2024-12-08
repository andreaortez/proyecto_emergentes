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
    const [investor, setInversionista] = useState<Inversionista | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const investor_id = sessionStorage.getItem("tipo_id");

    useEffect(() => {
        if (user_id) {
            axios.post('http://localhost:3001/User', { user_id })
                .then(async (result) => {
                    if (tipo === "Inversionista") {
                        const { correo, telefono, direccion } = result.data;
                        const monto = await getMonto();
                        console.log("monto " + monto);
                        setInversionista({
                            correo,
                            telefono,
                            direccion,
                            monto
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
    }, [user_id, tipo]);

    if (isLoading) {
        return <p>Cargando información del usuario...</p>;
    }

    async function getMonto() {
        try {
            const response = await axios.get('http://localhost:3001/Inversionista', {
                params: { investor_id }
            });
            return response.data.investor.monto_bolsa;
        } catch (error) {
            console.error("Error al buscar la Pyme:", error);
        }
    }

    return (
        <div className="components gap-4 d-flex">
            <UserProfile flag={true} />
            {tipo === "Pyme" && pyme && <UserInformation correo={pyme.correo} telefono={pyme.telefono} direccion={pyme.direccion} />}
            {tipo === "Inversionista" && investor && <UserInformation correo={investor.correo} telefono={investor.telefono} direccion={investor.direccion} monto={investor.monto} />}
        </div >
    );
};
