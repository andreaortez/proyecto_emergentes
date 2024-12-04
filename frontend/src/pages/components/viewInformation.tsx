import React from 'react';
import { useState } from "react";
import UserInfo from '../elements/userInformation';

interface User {
    correo: string;
    telefono: string;
    direccion: string;
}

export default function UserInformation({ correo, telefono, direccion }: User) {
    const [nombre, setNombre] = useState<string>(sessionStorage.getItem("nombre") || '');
    const [apellido, setApellido] = useState<string>(sessionStorage.getItem("apellido") || '');
    const [rol, setRol] = useState<string>(sessionStorage.getItem("rol") || '');
    const [avatar, setAvatar] = useState<string>(sessionStorage.getItem("avatar") || '');
    const [correo2, setCorreo] = useState<string>(correo);
    const [telefono2, setTelefono] = useState<string>(telefono);
    const [direccion2, setDireccion] = useState<string>(direccion);

    return (
        <>
            <div className="card " style={{ width: "53.3%" }}>
                <div className="card-body">
                    <div className='hstack gap-3 align-items-center '>
                        <h5 className="card-title">Información Personal</h5>
                    </div>
                    <div className='mt-4'>
                        <UserInfo icono={"./imagenes/ubicacion.png"} titulo={"Ubicación"} texto={direccion} />
                        <UserInfo icono={"./imagenes/correo.png"} titulo={"Correo Electrónico"} texto={correo} />
                        <UserInfo icono={"./imagenes/telefono.png"} titulo={"Número de Teléfono"} texto={telefono} />
                    </div>
                </div>
            </div>

        </>
    );
};