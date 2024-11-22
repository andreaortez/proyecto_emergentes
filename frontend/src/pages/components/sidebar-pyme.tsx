import React from 'react';
import Link from "next/link";

export default function Sidebar() {
    return (
        <>
            <div className="d-flex">
                {/* Sidebar */}
                <div
                    id="sidebar"
                    className="bg-light text-dark p-3"
                    style={{ minHeight: '100vh', width: '250px' }}
                >
                    <h4 className="text-center">Menú</h4>
                    <ul className="nav flex-column">
                        <li className="nav-item ">
                            <Link className="nav-link nav-elements" href="/Dashboard-pyme">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-elements" href="#">
                                Chat Inversores
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-elements" href="#">
                                Mi Perfil
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-elements" href="#" data-bs-toggle="collapse" data-bs-target="#submenu">
                                Mis Proyectos
                            </a>
                            <div id="submenu" className="collapse">
                                <ul className="nav flex-column ms-3">
                                    <li className="nav-item">
                                        <a className="nav-link nav-elements" href="#">
                                            Mail
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link nav-elements" href="#">
                                            Calendar
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link nav-elements" href="#">
                                            E-commerce
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};