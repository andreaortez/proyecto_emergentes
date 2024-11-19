import Link from "next/link";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LogIn() {
    const [email, setEmail] = useState<string>();
    const [pass, setPass] = useState<string>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        axios.post('http://localhost:3001/IniciarSesion', { email, pass })
            .then(result => {
                console.log(result)
                if (result.data === "Sesion Iniciada")
                    useRouter().push('/Registrarse');
            })

            .catch(err => console.log(err))
    }
    return (
        <>
            <div id="login">
                <div id="logo">
                    <img src="./imagenes/logo.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
                    <span className="navbar-brand mb-0 ms-2">$YUPI</span>
                </div>
                <p className="LG_SUtitle">Iniciar Sesión</p>
                <form onSubmit={handleSubmit} className="center">
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
                    <button className="UserButton btn" type="submit">
                        Iniciar Sesión
                    </button>
                    <div className="alternativa">
                        <p>¿No tienes una cuenta? </p>
                        <Link href="/Registrarse" className="textColor"> Haz click aquí para registrarte.</Link>
                    </div>
                </form>
            </div >
            <div className="image">
                <div className="overlay" id="ovl2">
                    <p className="title2">Bienvenido a</p>
                    <p className="title">$YUPI</p>
                    <p className="text">Inicia Sesión para acceder a tu cuenta.</p>
                </div>
                <img src="imagenes/FondoLI.png" alt="Iniciar Sesión" width="100%" height="630px" className="d-inline-block align-text-top" />
            </div>
            <div className="back">
                <Link href="/">
                    <img src="imagenes/atras.png" alt="Regresar" width="25" height="25" className="d-inline-block align-text-top" />
                </Link>
            </div>
        </>
    );
};