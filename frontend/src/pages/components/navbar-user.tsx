import { useEffect, useState } from 'react';
import axios from 'axios';

interface Parametros {
    setCurrentView: (view: string) => void;
    setSearchResults: (results: string) => void;
}

interface Notificaciones {
    id: string;
    proposalId: string;
    mensaje: string;
    fecha: string;
    emisores: Emisor[];
    receptorid: string;
}

interface Emisor {
    id: string;
    avatar: string;
    contraseña: string;
    correo: string;
    telefono: string;
    direccion: string;
    tipo: string;
}

export default function Navbar({ setCurrentView, setSearchResults }: Parametros) {
    const avatar = sessionStorage.getItem("avatar") || "https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png";
    const nombre = sessionStorage.getItem("nombre") || "Nombre";
    const apellido = sessionStorage.getItem("apellido") || "Apellido";
    const empresa = sessionStorage.getItem("empresa") || "Empresa";

    const tipo = sessionStorage.getItem("tipo");
    const [Pyme, setPyme] = useState<boolean>(false);
    const [Inversionista, setInversionista] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");

    const user_id = sessionStorage.getItem("user_id");
    const [notificaciones, setNotificaciones] = useState<Notificaciones[]>([]);

    useEffect(() => {
        if (tipo === "Inversionista") {
            setPyme(false);
            setInversionista(true);
        } else {//pyme
            setPyme(true);
            setInversionista(false);
        }
    }, [tipo]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchResults(searchText);
        setCurrentView("searchProyects");
    };

    const listarNotificaciones = async () => {
        try {
            console.log("userid : ", user_id);
            const response = await axios.get('http://localhost:3001/Notificaciones', {
                params: { user_id }
            });

            console.log(response.data);
            setNotificaciones(response.data.length > 0 ? response.data.map((notificacion: any) => ({
                id: notificacion._id,
                proposalId: notificacion.proposalId,
                fecha: notificacion.fecha,
                emisores: notificacion.emisores,
                receptorid: notificacion.receptorid,
            })) : []);
        } catch (error) {
            console.error("Error al cargar las notificaciones:", error);
        }
    };

    return (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className="container-fluid">
                {/* Logo */}
                <a className="navbar-brand d-flex align-items-center">
                    <img src="./imagenes/logo.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
                    <span className="navbar-brand mb-0 h1 ms-2">$YUPI</span>
                </a>
                {/* Search */}
                <form className="d-flex" role="search" onSubmit={handleSearch}>
                    <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)} />
                    <button className="btn btn2" type="submit">
                        Buscar
                    </button>
                </form>
                {/* User Profile */}
                <div className="hstack gap-2">
                    {Inversionista &&
                        <div className="dropdown">
                            <button
                                className="btn btn-link position-relative"
                                id="dropdownNotification"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={listarNotificaciones}
                            >
                                <img
                                    src="/imagenes/notificacion.png"
                                    alt="Notificaciones"
                                    className="nav-icon"
                                    width="30"
                                    height="30"
                                    id="notificaciones"
                                />
                                <span className="position-absolute top-0 start-70 translate-middle badge rounded-pill bg-danger">
                                    {notificaciones.length}
                                </span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-width" aria-labelledby="dropdownNotification">
                                <li><h4 className="text-center">Notificaciones</h4></li>
                                {notificaciones.length > 0 ? (
                                    notificaciones.map((notificacion) => (
                                        <li key={notificacion.id}>
                                            <a className="dropdown-item" href="#">
                                                {notificacion.mensaje}: {notificacion.fecha}
                                            </a>
                                        </li>
                                    ))
                                ) : (
                                    <li>
                                        <span className="dropdown-item text-muted">Sin notificaciones</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
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