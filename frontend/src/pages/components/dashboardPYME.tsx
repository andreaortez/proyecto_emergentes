import React from 'react';
import Portada from './portadaUsuario'

export default function dashboard() {
    return (
        <>
            <Portada />
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