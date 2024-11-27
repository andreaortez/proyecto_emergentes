import React from "react";
import Tab from '../components/filtros'
import Proyectos from '../components/listarProyectos'

export default function Search() {
    return (
        <div className="vstack gap-3">
            <Tab />
            <Proyectos />
        </div>
    );
};