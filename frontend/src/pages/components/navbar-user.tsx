import { useEffect, useState } from 'react';

interface Parametros {
    setCurrentView: (view: string) => void;
}

export default function Navbar({ setCurrentView }: Parametros) {
    const avatar = sessionStorage.getItem("avatar") || "https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png";
    const nombre = sessionStorage.getItem("nombre") || "Nombre";
    const empresa = sessionStorage.getItem("nombre") || "Empresa";
    const apellido = sessionStorage.getItem("apellido") || "Apellido";

    const tipo = sessionStorage.getItem("tipo");
    const [Pyme, setPyme] = useState<boolean>(false);
    const [Inversionista, setInversionista] = useState<boolean>(false);

    useEffect(() => {
        if (tipo === "Inversionista") {
            setPyme(false);
            setInversionista(true);
        } else {//pyme
            setPyme(true);
            setInversionista(false);
        }
    }, [tipo]);

    return (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className="container-fluid">
                {/* Logo */}
                <a className="navbar-brand d-flex align-items-center">
                    <img src="./imagenes/logo.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
                    <span className="navbar-brand mb-0 h1 ms-2">$YUPI</span>
                </a>
                {/* Search */}
                <form className="d-flex" role="search" onSubmit={(e) => {
                    e.preventDefault();
                    setCurrentView("searchProyects");
                }}>
                    <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                    <button className="btn btn2" type="submit">
                        Buscar
                    </button>
                </form>
                {/* User Profile */}
                <div className="hstack gap-2">
                    <img
                        src={avatar || ""}
                        alt="User Avatar"
                        className="rounded-circle"
                        width="40"
                        height="40"
                    />
                    {Inversionista && <span>{nombre} {apellido}</span>}
                    {Pyme && <span>{empresa}</span>}
                </div>
            </div>
        </nav >
    )
}