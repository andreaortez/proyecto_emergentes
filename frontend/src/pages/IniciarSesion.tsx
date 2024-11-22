import Link from "next/link";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LogIn() {
    const [email, setEmail] = useState<string>();
    const [pass, setPass] = useState<string>();
    const [modalMessage, setModalMessage] = useState<string>('');
    const [modalTitle, setModalTitle] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axios.post('http://localhost:3000/IniciarSesion', { email, pass })
            .then(result => {
                if (result.data === "Sesion Iniciada") {
                    setModalTitle("¡Éxito!");
                    setModalMessage("Inicio de sesión exitoso.");
                    setShowModal(true);
                } else {
                    if (result.data === "contraseña incorrecta") {
                        setModalTitle("¡Error!");
                        setModalMessage("Contraseña incorrecta.");
                        setShowModal(true);
                    } else {
                        setModalTitle("¡Error!");
                        setModalMessage("El usuario no existe");
                        setShowModal(true);
                    }
                    
                }
            })
            .catch(() => {
                setModalTitle("¡Error!");
                setModalMessage("No se pudo conectar con el servidor. Intenta nuevamente más tarde.");
                setShowModal(true);
            });
    };

    const handleNavigation = () => {
        router.push('/Dashboard-pyme');
    };


    return (
        <>
            {/* Form */}
            <div className="LG_SU-background float-start" style={{ paddingTop: '90px' }}>
                {/* Flecha */}
                <div className="back position-absolute top-0 end-0">
                    <Link href="/">
                        <img src="imagenes/atras.png" alt="Regresar" width="25" height="25" />
                    </Link>
                </div>
                {/* Logo */}
                <div id="logo" className="position-absolute top-0 start-0 d-flex align-items-center p-2">
                    <img src="./imagenes/logo.png" alt="Logo" width="40" height="40" />
                    <span className="navbar-brand mb-0 ms-2">$YUPI</span>
                </div>

                <p className="LG_SUtitle text-center" >Iniciar Sesión</p>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                            Correo Electrónico
                        </label>
                        <div className="col-sm-9">
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail3"
                                onChange={(input) => setEmail(input.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">
                            Contraseña
                        </label>
                        <div className="col-sm-9">
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword3"
                                onChange={(input) => setPass(input.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="pageButton btn" type="submit">
                            Iniciar Sesión
                        </button>
                    </div>
                    <div className="alternativa">
                        <p>¿No tienes una cuenta? </p>
                        <Link href="/Registrarse" className="textColor"> Haz click aquí para registrarte.</Link>
                    </div>
                </form>

            </div >
            {/* Imagen */}
            < div className="image position-absolute top-0 end-0" >
                <div className="overlay ovl2">
                    <p className="title2">Bienvenido a</p>
                    <p className="title">$YUPI</p>
                    <p className="text">Inicia Sesión para acceder a tu cuenta.</p>
                </div>
                <img src="imagenes/FondoLI.png" alt="Iniciar Sesión" width="100%" height="630px" />
            </div >


            {/* Modal */}
            {
                showModal && (
                    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{modalTitle}</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>{modalMessage}</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary pageButton"
                                        onClick={() => {
                                            setShowModal(false);
                                            handleNavigation();
                                        }}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }
        </>
    );
};