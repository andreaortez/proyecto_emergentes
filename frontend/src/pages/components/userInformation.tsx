import React from 'react';
import { useState } from "react";
import axios from 'axios';
import Modal from '../components/modal'

interface User {
    correo: string;
    telefono: string;
    direccion: string;
}

export default function UserInformation({ correo, telefono, direccion }: User) {
    const [nombre, setNombre] = useState<string>(sessionStorage.getItem("nombre") || '');
    const [apellido, setApellido] = useState<string>(sessionStorage.getItem("apellido") || '');
    const [rol, setRol] = useState<string>(sessionStorage.getItem("rol") || '');
    const [avatar, setAvatar] = useState<string>(sessionStorage.getItem("avatar") || '');
    const [correo2, setCorreo] = useState<string>(correo);
    const [telefono2, setTelefono] = useState<string>(telefono);
    const [direccion2, setDireccion] = useState<string>(direccion);

    // Estados temporales para la edición
    const [tempNombre, setTempNombre] = useState(nombre);
    const [tempCorreo, setTempCorreo] = useState(correo);
    const [tempRol, setTempRol] = useState(rol);
    const [tempApellido, setTempApellido] = useState(apellido);
    const [tempTelefono, setTempTelefono] = useState(telefono);
    const [tempDireccion, setTempDireccion] = useState(direccion);
    const [tempAvatar, setTempAvatar] = useState(avatar);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showMessage, setMessage] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setTempAvatar(imageURL);
        }
    };

    const handleSaveChanges = () => {
        setNombre(tempNombre);
        setCorreo(tempCorreo);
        setRol(tempRol);
        setApellido(tempApellido);
        setTelefono(tempTelefono);
        setDireccion(tempDireccion);
        setAvatar(tempAvatar);

        const user_id = sessionStorage.getItem("user_id");
        if (user_id) {
            try {
                axios.put('http://localhost:3001/User', {
                    user_id,
                    avatar: tempAvatar,
                    nombre: tempNombre,
                    apellido: tempApellido,
                    correo: tempCorreo,
                    telefono: tempTelefono,
                    direccion: tempDireccion,
                    rol: tempRol
                })
                    .then(result => {
                        sessionStorage.setItem("nombre", result.data.nombre);
                        sessionStorage.setItem("apellido", result.data.apellido);
                        sessionStorage.setItem("rol", result.data.rol);
                        sessionStorage.setItem("avatar", result.data.avatar);
                        setShowModal(false);

                        setTitle('¡Éxito!');
                        setBody("Su usuario se ha editado correctamente.");
                        setMessage(true);
                        //window.location.reload();
                    })
            } catch (error) {
                setTitle('Error!');
                setBody('Ocurrió un problema al editar su usuario. Inténtalo nuevamente.');
                setShowModal(true);
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
                            <div className="col">
                                <p className="card-text text-body-secondary mt-5 mb-2">Nombre</p>
                                <p>{nombre}</p>

                                <p className="card-text text-body-secondary mt-5 mb-2">Correo Electrónico</p>
                                <p>{correo2}</p>

                                <p className="card-text text-body-secondary mt-5 mb-2">Rol</p>
                                <p>{rol}</p>

                            </div>
                            <div className="col">
                                <p className="card-text text-body-secondary mt-5 mb-2">Apellido</p>
                                <p>{apellido}</p>

                                <p className="card-text text-body-secondary mt-5 mb-2">Número de Teléfono</p>
                                <p>{telefono2}</p>

                                <p className="card-text text-body-secondary mt-5 mb-2">Dirección</p>
                                <p>{direccion2}</p>
                            </div>
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
                                        <div className='border-end d-flex flex-column align-items-center'>
                                            <img
                                                src={sessionStorage.getItem("avatar") || "https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png"}
                                                alt="User Avatar"
                                                className="rounded-circle mb-3 mt-3 border"
                                                width="120"
                                                height="120"
                                            />
                                            <div className="mb-3 me-4">
                                                <label htmlFor="avatar" className="form-label">Editar Foto de Perfil</label>
                                                <input className="form-control form-control-sm mb-4" id="avatar" type="file" onChange={handleAvatarChange} />

                                                <label htmlFor="avatar2" className="form-label">O copiar link</label>
                                                <input type="text" id="avatar2" className="form-control mb-4" value={tempAvatar} onChange={(e) => setTempAvatar(e.target.value)} />
                                            </div>
                                        </div>

                                        <div>
                                            <div className='row '>
                                                <div className='col'>
                                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                                    <input type="text" id="nombre" className="form-control mb-4" value={tempNombre} onChange={(e) => setTempNombre(e.target.value)} />

                                                    <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                                                    <input type="email" id="correo" className="form-control mb-4" value={tempCorreo} onChange={(e) => setTempCorreo(e.target.value)} />

                                                    <label htmlFor="rol" className="form-label">Rol</label>
                                                    <input type="text" id="rol" className="form-control" value={tempRol} onChange={(e) => setTempRol(e.target.value)} />
                                                </div>
                                                <div className='col'>
                                                    <label htmlFor="apellido" className="form-label">Apellido</label>
                                                    <input type="text" id="apellido" className="form-control mb-4" value={tempApellido} onChange={(e) => setTempApellido(e.target.value)} />

                                                    <label htmlFor="telefono" className="form-label">Número de Teléfono</label>
                                                    <input type="text" id="telefono" className="form-control mb-4" value={tempTelefono} onChange={(e) => setTempTelefono(e.target.value)} />

                                                    <label htmlFor="direccion" className="form-label">Dirección</label>
                                                    <input type="text" id="direccion" className="form-control" value={tempDireccion} onChange={(e) => setTempDireccion(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="modal-footer gap-2">
                                    <button type="button"
                                        className="btn btn-secondary"
                                        onClick={() => { setShowModal(false); }}>
                                        Cerrar
                                    </button>
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
            {showMessage && <Modal title={title} body={body} onClose={() => setMessage(false)} />}
        </>
    );
};