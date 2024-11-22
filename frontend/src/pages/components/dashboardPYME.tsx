import React from 'react';

export default function dashboard() {
    return (
        <>
            <div style={{ width: '100%' }}>
                <div className='portadaUsuario'>
                    <div className="overlay3">
                        <p className="title3">¡$Yupi te da la bienvenida!</p>
                        <p className="text">Hecha un vistazo a las nuevas novedades que se te presentan en el Dashboard.</p>
                    </div>
                </div>

                <div className="usuario-card">
                    <img
                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                        alt="User Avatar"
                        className="rounded-circle avatar-container"
                        width="70"
                        height="70"
                    />
                    <div className="user-name">
                        <p>Nombre del Usuario</p>
                        <p>-</p>
                        <p>Rol</p>
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
            </div>

        </>
    );
};