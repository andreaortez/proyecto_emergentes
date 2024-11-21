import Link from "next/link";
import React from 'react';

export default function SignUp() {
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
            <div className="LG_SU-background float-end" style={{ paddingTop: '0px' }}>
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
                <form className="center">
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">Nombre</label>
                            <input type="text" className="form-control" placeholder="Nombre" aria-label="First name" />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="Apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" placeholder="Apellido" aria-label="Last name" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="inputEmail4" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" placeholder="Correo electrónico" aria-label="First name" />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="nombre" className="form-label">Número de teléfono</label>
                            <input type="text" className="form-control" placeholder="Número de teléfono" aria-label="Last name" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="inputPassword4" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" placeholder="Contraseña" aria-label="First name" />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="inputState" className="form-label">Tipo de cuenta</label>
                            <select id="inputState" className="form-select">
                                <option selected>PYME</option>
                                <option>Inversionista</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="UserButton btn" type="submit">
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