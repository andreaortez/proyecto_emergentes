import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';

export default function SignUp() {
    const router = useRouter();
    const tipo = "Pyme";
    //User Data
    const [empresa, setEmpresa] = useState<string>("");
    const [correo, setCorreo] = useState<string>();
    const [contraseña, setContraseña] = useState<string>();
    const [telefono, setTelefono] = useState<string>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axios.post('http://localhost:3001/Registrarse', { empresa, correo, contraseña, telefono, tipo })
            .then(result => {
                if (result.data.status === "success") {
                    console.log(result)
                    sessionStorage.setItem('user_id', result.data.user_id);
                    sessionStorage.setItem('tipo_id', result.data.pyme_id);
                    window.location.href = "/$YUPI";
                    router.push('/$YUPI');
                }
            })
            .catch((error) => {
                console.log(error)
            });
    };
    return (
        <>
            {/* Imagen */}
            <div className="image position-absolute top-0 start-0">
                <div className="overlay ovl2">
                    <p className="title">¿Eres nuevo aquí?</p>
                    <p className="text">¡Regístrate y descubre una gran cantidad de nuevas oportunidades!</p>
                </div>
                <img src="imagenes/FondoLI.png" alt="Iniciar Sesión" width="100%" height="630px" />
            </div>

            {/* Form */}
            <div className="LG_SU-background float-end" style={{ paddingTop: '85px' }}>
                {/* Flecha */}
                <div className="back position-absolute top-0 start-50 p-2">
                    <Link href="/">
                        <img src="imagenes/atras.png" alt="Regresar" width="25" height="25" />
                    </Link>
                </div>
                {/* Logo */}
                <div id="logo" className="position-absolute top-0 end-0 d-flex align-items-center">
                    <img src="./imagenes/logo.png" alt="Logo" width="40" height="40" />
                    <span className="navbar-brand mb-0 ms-2">$YUPI</span>
                </div>

                <p className="LG_SUtitle text-center">Crear Cuenta</p>
                <form onSubmit={handleSubmit} className="center">
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">Nombre de la Empresa</label>
                            <input
                                onChange={(input) => setEmpresa(input.target.value)}
                                type="text" className="form-control" aria-label="Nombre" required />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="inputEmail4" className="form-label">Correo electrónico</label>
                            <input
                                onChange={(input) => setCorreo(input.target.value)}
                                type="email" className="form-control" aria-label="Correo" required />
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-6 mb-3">
                            <label htmlFor="nombre" className="form-label">Número de teléfono</label>
                            <input
                                onChange={(input) => setTelefono(input.target.value)}
                                type="text" className="form-control" aria-label="Numero" required />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="inputPassword4" className="form-label">Contraseña</label>
                            <input
                                onChange={(input) => setContraseña(input.target.value)}
                                type="password" className="form-control" aria-label="Contraseña" required />
                        </div>
                    </div>
                    <div className="row">

                    </div>
                    <div className="text-center">
                        <button className="pageButton btn" type="submit">
                            Registrarse
                        </button>
                    </div>

                    <div className="alternativa">
                        <p>¿Ya tienes una cuenta? </p>
                        <Link href="/IniciarSesion" className="textColor"> Haz click aquí para iniciar sesión.</Link>
                    </div>
                </form >
            </div >
        </>
    );
};