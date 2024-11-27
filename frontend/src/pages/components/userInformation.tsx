import React from 'react';

interface User {
    correo: string;
    telefono: string;
    direccion: string;
}

export default function userInformation({ correo, telefono, direccion }: User) {
    return (
        <div className="card " style={{ width: "53.3%" }}>
            <div className="card-body">
                <div className='hstack gap-3 align-items-center '>
                    <h5 className="card-title">Información Personal</h5>
                    <button type="button"
                        className="btn btn4 ms-auto d-flex justify-content-center align-items-center gap-2"
                    >
                        <img
                            src="./imagenes/lapiz2.png"
                            alt="Editar"
                            width="18"
                            height="18"
                            id="btn-img-editar"
                        />
                        Editar
                    </button>
                </div>
                <div className="card-text paddingLeft">
                    <div className="row align-items-start">
                        <div className="col">
                            <p className="card-text text-body-secondary mt-5 mb-2">Nombre</p>
                            <p>{sessionStorage.getItem("nombre")}</p>

                            <p className="card-text text-body-secondary mt-5 mb-2">Correo Electrónico</p>
                            <p>{`${correo}`}</p>

                            <p className="card-text text-body-secondary mt-5 mb-2">Rol</p>
                            <p>{sessionStorage.getItem("rol")}</p>

                        </div>
                        <div className="col">
                            <p className="card-text text-body-secondary mt-5 mb-2">Apellido</p>
                            <p>{sessionStorage.getItem("apellido")}</p>

                            <p className="card-text text-body-secondary mt-5 mb-2">Número de Teléfono</p>
                            <p>{`${telefono}`}</p>

                            <p className="card-text text-body-secondary mt-5 mb-2">Dirección</p>
                            <p>{`${direccion}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};