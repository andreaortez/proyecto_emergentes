import React from 'react';
import Portada from '../components/portada'
import UserName from '../components/userName'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function dashboard() {
    const userID = sessionStorage.getItem("user_id");
    //const [ID, setUserID] = useState("");

    // useEffect(() => {
    //     const userID = sessionStorage.getItem("user_id");

    //     if (userID) {
    //         setUserID(userID);
    //     }
    // }, []);

    const cargarDatos = async () => {
        try {
            let url = "http://localhost:3001/MiPerfil";
            
            console.log("user_id in PymeDash:", userID);
            const result = await axios.post(url, { user_id: userID });

            if (result.status === 200) {
                sessionStorage.setItem('nombre', result.data.nombre);
                sessionStorage.setItem('apellido', result.data.apellido);
                sessionStorage.setItem('rol', result.data.rol);
                sessionStorage.setItem('avatar', result.data.avatar);
            }
        } catch (error) {
            console.error("Error al cargar los datos del usuario:", error);
        }
    };

    useEffect(() => {
        if (userID) {
            cargarDatos();
        } else {
            console.error("No se encontró user_id en el sessionStorage");
        }
    }, [userID]);//se ejecuta solo si el id cambia

    return (
        <>
            <div className='vstack'>
                <Portada />
                <div className='p-4'>
                    <UserName />
                </div>
            </div>

            <div className='grafica'>
                <img
                    src="./imagenes/grafico.png"
                    alt="User Avatar"
                    width="60%"
                    height="75%"
                />
            </div>

            <div>
                <div className='estadisticas'>
                    <img
                        src="./imagenes/1.png"
                        alt="User Avatar"
                        width="40%"
                        height="40%"
                    />
                    <img
                        src="./imagenes/2.png"
                        alt="User Avatar"
                        width="40%"
                        height="40%"
                    />
                </div>
                <div className='estadisticas2'>
                    <img
                        src="./imagenes/3.png"
                        alt="User Avatar"
                        width="40%"
                        height="40%"
                    />
                    <img
                        src="./imagenes/4.png"
                        alt="User Avatar"
                        width="40%"
                        height="40%"
                    />
                </div>
            </div>
        </>
    );
};