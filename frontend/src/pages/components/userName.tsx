import React from 'react';
import { useEffect, useState } from 'react';

export default function Nombre() {
    const avatar = sessionStorage.getItem("avatar");
    const apellido = sessionStorage.getItem("apellido");
    const tipo = sessionStorage.getItem("tipo");

    const [Pyme, setPyme] = useState<boolean>(false);
    const [Inversionista, setInversionista] = useState<boolean>(false);

    const nombre = sessionStorage.getItem("nombre") || "Nombre";
    const empresa = sessionStorage.getItem("empresa") || "Nombre";

    useEffect(() => {
        if (tipo === "Pyme") {
            setPyme(true);
            setInversionista(false);
        } else {
            setPyme(false);
            setInversionista(true);
        }
    }, [tipo]);

    return (
        <div className="card usuario-card">
            <div className="card-body d-flex gap-4">
                <img
                    src={avatar || ""}
                    alt="User Avatar"
                    className="rounded-circle"
                    width="70"
                    height="70"
                />
                <div className="user-name  hstack gap-1">
                    {Pyme && <p className="mb-0">{empresa}</p>}
                    {Inversionista && <p className="mb-0">{nombre} {apellido}</p>}
                    <span className='text-body-secondary fw-light'> - {tipo}</span>
                </div>
            </div>
        </div>
    );
};