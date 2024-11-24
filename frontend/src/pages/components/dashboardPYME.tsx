import React from 'react';
import Portada from './portada'
import UserName from './userName'

export default function dashboard() {
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