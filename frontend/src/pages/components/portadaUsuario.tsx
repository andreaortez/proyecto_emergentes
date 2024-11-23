import React from 'react';

export default function Portada() {
    return (
        <>
            <div className='portadaUsuario'>
                <div className="overlay3">
                    <p className="title3">¡$Yupi te da la bienvenida!</p>
                    <p className="text">Hecha un vistazo a las nuevas novedades que se te presentan en el Dashboard.</p>
                </div>
            </div>

            <div className="usuario-card hstack gap-3">
                <img
                    src="https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png"
                    alt="User Avatar"
                    className="rounded-circle"
                    width="70"
                    height="70"
                />
                <div className="user-name hstack gap-2">
                    <p>Nombre del Usuario</p>
                    <p>-</p>
                    <p>Rol</p>
                </div>
            </div>
        </>
    );
};