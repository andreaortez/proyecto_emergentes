import React from 'react';

export default function userProfile() {
    return (
        <div className="card text-center" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{sessionStorage.getItem("nombre")} {sessionStorage.getItem("apellido")}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary fw-light">{sessionStorage.getItem("rol")}</h6>
                <img
                    src={sessionStorage.getItem("avatar") || "https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png"}
                    alt="User Avatar"
                    className="rounded-circle mb-3 mt-3"
                    width="120"
                    height="120"
                />
                <button type="button" className="btn btn3">Eliminar Cuenta</button>
            </div>
        </div>
    );
};