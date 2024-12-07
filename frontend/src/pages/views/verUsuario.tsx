import React from 'react';
import UserProfile from '../components/userProfile'
import UserInformation from '../components/viewInformation'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Proyectos from '../components/listarProyectos';

interface Inversionista {
    nombre: string;
    apellido: string;
    avatar: string;
    rol: string;
    correo: string;
    telefono: string;
    direccion: string;
}

interface Lista {
    user: Inversionista;
}

export default function VerUsuarios() {
    return (
        <div className="components">
            <div className="align-items-start gap-4 d-flex">
                <UserProfile flag={false} />
                {/*<UserInformation correo={user.correo} telefono={user.telefono} direccion={user.direccion} />*/}
            </div>
            {/*  <Proyectos /> */}
        </div >
    );
};
