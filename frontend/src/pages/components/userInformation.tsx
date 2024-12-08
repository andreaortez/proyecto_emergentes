import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import Modal from '../modals/modal'

interface User {
    correo: string;
    telefono: string;
    direccion: string;
    monto?: string;
    apellido?: string;
    empresa?: string;
}

export default function UserInformation({ correo, telefono, direccion, monto }: User) {
    const avatar = sessionStorage.getItem("avatar") || "";

    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [empresa, setEmpresa] = useState<string>("");

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const tipo = sessionStorage.getItem("tipo");
    const [Pyme, setPyme] = useState<boolean>(false);
    const [Inversionista, setInversionista] = useState<boolean>(false);

    useEffect(() => {
        if (tipo === "Inversionista") {
            setPyme(false);
            setInversionista(true);

            setNombre(sessionStorage.getItem("nombre") || "");
            setApellido(sessionStorage.getItem("apellido") || "");
        } else {//pyme
            setPyme(true);
            setInversionista(false);

            setEmpresa(sessionStorage.getItem("nombre") || "");
        }
    }, [tipo]);

    const [formData, setFormData] = useState({
        nombre,
        correo,
        apellido,
        telefono,
        direccion,
        avatar,
        monto,
        empresa
    });

    useEffect(() => {
        setFormData({ nombre, correo, apellido, telefono, direccion, avatar, monto, empresa });
    }, [nombre, correo, apellido, telefono, direccion, avatar, empresa, monto]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSaveChanges = () => {
        const user_id = sessionStorage.getItem("user_id");
        if (user_id) {
            try {
                axios.put('http://localhost:3001/User', {
                    user_id,
                    ...formData,
                    tipo,
                })
                    .then(result => {
                        if (tipo === "Inversionista") {
                            sessionStorage.setItem("nombre", result.data.nombre);
                            sessionStorage.setItem("apellido", result.data.apellido);
                            sessionStorage.setItem("avatar", result.data.avatar);
                        } else {//Pyme
                            sessionStorage.setItem("nombre", result.data.empresa);
                            sessionStorage.setItem("avatar", result.data.avatar);
                        }
                        setShowModal(false);
                        setTitle('¡Éxito!');
                        setMessage("Su usuario se ha editado correctamente.");
                        setShowMessage(true);
                        //window.location.reload();

                        console.log("Datos actualizados recibidos:", result.data);
                    })
            } catch (error) {
                setShowModal(false);
                setTitle('¡Error!');
                setMessage('Ocurrió un problema al editar su usuario. Inténtalo nuevamente.');
                setShowMessage(true);
            }
        }
    };

    return (
        <>
            <div className="card " style={{ width: "53.3%" }}>
                <div className="card-body">
                    <div className='hstack gap-3 align-items-center '>
                        <h5 className="card-title">Información Personal</h5>
                        <button type="button"
                            className="btn btn4 ms-auto d-flex justify-content-center align-items-center gap-2"
                            onClick={() => { setShowModal(true); }}
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
                            {Inversionista && (
                                <>
                                    <div className="col">
                                        <p className="card-text text-body-secondary mt-5 mb-2">Nombre</p>
                                        <p>{nombre}</p>

                                        <p className="card-text text-body-secondary mt-5 mb-2">Correo Electrónico</p>
                                        <p>{correo}</p>

                                        <p className="card-text text-body-secondary mt-5 mb-2">Monto</p>
                                        <p>{monto}</p>

                                    </div>
                                    <div className="col">
                                        <p className="card-text text-body-secondary mt-5 mb-2">Apellido</p>
                                        <p>{apellido}</p>

                                        <p className="card-text text-body-secondary mt-5 mb-2">Número de Teléfono</p>
                                        <p>{telefono}</p>

                                        <p className="card-text text-body-secondary mt-5 mb-2">Dirección</p>
                                        <p>{direccion}</p>
                                    </div>
                                </>
                            )}

                            {Pyme && (
                                <>
                                    <div className="col">
                                        <p className="card-text text-body-secondary mt-5 mb-2">Nombre de la Empresa</p>
                                        <p>{empresa}</p>

                                        <p className="card-text text-body-secondary mt-5 mb-2">Correo Electrónico</p>
                                        <p>{correo}</p>

                                    </div>
                                    <div className="col">

                                        <p className="card-text text-body-secondary mt-5 mb-2">Número de Teléfono</p>
                                        <p>{telefono}</p>

                                        <p className="card-text text-body-secondary mt-5 mb-2">Dirección</p>
                                        <p>{direccion}</p>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {
                showModal && (
                    <div className="modal fade show d-block " tabIndex={-1} data-bs-backdrop="static" onClick={() => setShowModal(false)}>
                        <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Mi Perfil</h1>
                                    <button type="button" className="btn-close"
                                        onClick={() => { setShowModal(false); }}>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className='hstack gap-4 p-4'>
                                        <div className="me-4 d-flex flex-column align-items-center justify-content-start text-center">
                                            <img
                                                src={avatar || "https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png"}
                                                alt="User Avatar"
                                                className="rounded-circle mb-3 mt-3 border"
                                                width="120"
                                                height="120"
                                            />
                                            <div className="mb-3">
                                                <label htmlFor="avatar" className="form-label">Copiar link de la imagen</label>
                                                <input type="text" id="avatar" className="form-control mb-4" value={formData.avatar} onChange={handleInputChange} />
                                            </div>
                                        </div>


                                        <div className='row border-start'>
                                            {Inversionista && (
                                                <>
                                                    <div className='col ms-4'>
                                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                                        <input type="text" id="nombre" className="form-control mb-4" value={formData.nombre} onChange={handleInputChange} />

                                                        <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                                                        <input type="email" id="correo" className="form-control mb-4" value={formData.correo} onChange={handleInputChange} />

                                                        <label htmlFor="monto" className="form-label">Monto</label>
                                                        <input type="text" id="monto" className="form-control" value={formData.monto} onChange={handleInputChange} />
                                                    </div>
                                                    <div className='col'>
                                                        <label htmlFor="apellido" className="form-label">Apellido</label>
                                                        <input type="text" id="apellido" className="form-control mb-4" value={formData.apellido} onChange={handleInputChange} />

                                                        <label htmlFor="telefono" className="form-label">Número de Teléfono</label>
                                                        <input type="text" id="telefono" className="form-control mb-4" value={formData.telefono} onChange={handleInputChange} />

                                                        <label htmlFor="direccion" className="form-label">Dirección</label>
                                                        <input type="text" id="direccion" className="form-control" value={formData.direccion} onChange={handleInputChange} />
                                                    </div>
                                                </>
                                            )}


                                            {Pyme && (
                                                <>
                                                    <div className='col ms-4 mt-4'>
                                                        <label htmlFor="empresa" className="form-label">Nombre de la Empresa</label>
                                                        <input type="text" id="empresa" className="form-control mb-4" value={formData.empresa} onChange={handleInputChange} />

                                                        <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                                                        <input type="email" id="correo" className="form-control mb-4" value={formData.correo} onChange={handleInputChange} />
                                                    </div>
                                                    <div className='col'>
                                                        <label htmlFor="telefono" className="form-label">Número de Teléfono</label>
                                                        <input type="text" id="telefono" className="form-control mb-4" value={formData.telefono} onChange={handleInputChange} />

                                                        <label htmlFor="direccion" className="form-label">Dirección</label>
                                                        <input type="text" id="direccion" className="form-control" value={formData.direccion} onChange={handleInputChange} />
                                                    </div>
                                                </>
                                            )}

                                        </div>
                                    </div>

                                </div>
                                <div className="modal-footer gap-2">
                                    <button type="button"
                                        className="btn btn2"
                                        onClick={handleSaveChanges}
                                    >
                                        Guardar Cambios</button>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }

            {/* Modal */}
            {showMessage && <Modal title={title} message={message} onClose={() => setShowMessage(false)} />}
        </>
    );
};