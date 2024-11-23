import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    {/* Logo */}
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img src="./imagenes/logo.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
                        <span className="navbar-brand mb-0 h1 ms-2">$YUPI</span>
                    </a>
                    {/* Search */}
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                        <button className="btn btn2" type="submit">Buscar</button>
                    </form>
                    {/* User Profile */}
                    <a
                        className="nav-link dropdown-toggle d-flex align-items-center"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                            alt="User Avatar"
                            className="rounded-circle"
                            width="30"
                            height="30"
                        />
                        <span className="ms-2">User Name</span>
                    </a>
                </div>
            </nav >
        </>
    )
}