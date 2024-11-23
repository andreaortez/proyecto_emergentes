import React from 'react';

export default function userInformation() {
    return (
        <div className="card " style={{ width: "51%" }}>
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
                            <p>Nombre</p>

                            <p className="card-text text-body-secondary mt-5 mb-2">Correo Electrónico</p>
                            <p>Correo Electrónico</p>

                            <p className="card-text text-body-secondary mt-5 mb-2">Dirección</p>
                            <p>Dirección</p>
                        </div>
                        <div className="col">
                            <p className="card-text text-body-secondary mt-5 mb-2">Apellido</p>
                            <p>Apellido</p>

                            <p className="card-text text-body-secondary mt-5 mb-2">Número de Teléfono</p>
                            <p>Número de Teléfono</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};