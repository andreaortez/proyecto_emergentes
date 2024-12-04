import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Modal from '../modals/modal';
import { useRouter } from 'next/router';

interface buttons {
    flag: boolean;
}

export default function userProfile({ flag }: buttons) {
    const router = useRouter();
    const user_id = sessionStorage.getItem("user_id");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const deleteUser = async () => {
        if (user_id) {
            try {
                await axios.delete('http://localhost:3001/User', {
                    data: { user_id }
                });
                // Éxito
                setTitle('¡Éxito!');
                setBody('Se ha eliminado su usuario con éxito.');
                setShowModal(true);

                router.push('/');
            } catch (error) {
                console.log(error);
                setTitle('¡Error!');
                setBody('Ocurrió un problema al eliminar su usuario.');
                setShowModal(true);
            }
        };
    }

    const handleConfirmDelete = () => {
        setShowConfirmModal(false);
        deleteUser();
    };

    return (
        <>
            <div className="card text-center" style={{ width: "18rem" }}>
                <div className="card-body"
                    style={{ height: "100%" }}>
                    <h5 className="card-title">{sessionStorage.getItem("nombre")} {sessionStorage.getItem("apellido")}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary fw-light">{sessionStorage.getItem("rol")}</h6>
                    <img
                        src={sessionStorage.getItem("avatar") || "https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png"}
                        alt="User Avatar"
                        className="rounded-circle mb-3 mt-3"
                        width="120"
                        height="120"
                    />
                    {flag &&
                        <button type="button"
                            className="btn btn-danger"
                            onClick={() => { setShowConfirmModal(true); }}>
                            Eliminar Cuenta
                        </button>}

                </div>
            </div >

            {/* Modal de confirmación */}
            {
                showConfirmModal && (
                    <Modal
                        title="Confirmación de Eliminación"
                        body="¿Está seguro de que desea eliminar su cuenta?"
                        onClose={() => setShowConfirmModal(false)}
                        footer={
                            <>
                                <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                                    Cancelar
                                </button>
                                <button className="btn btn-danger" onClick={handleConfirmDelete}>
                                    Eliminar
                                </button>
                            </>
                        }
                    />
                )
            }

            {/* Modal de resultado*/}
            {showModal && <Modal title={title} body={body} onClose={() => setShowModal(false)} />}
        </>
    );
};