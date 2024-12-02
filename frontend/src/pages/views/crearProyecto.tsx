import react from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Proyecto {
    nombre: string;
    imagen: string;
    meta: number;
    descripcion: string;
    recaudado: number;
}

export default function MisProyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const pyme_id = sessionStorage.getItem("tipo_id");

    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                //console.log("pyme_id desde sessionStorage:", pyme_id);
                const response = await axios.post('http://localhost:3001/Proyecto', {
                    params: { pyme_id }
                });
                if (response.data.length > 0) {
                    setProyectos(response.data);
                } else {
                    console.warn("No hay proyectos para este pyme_id.");
                    setProyectos([]);
                }
            } catch (error) {
                console.error("Error al cargar los proyectos:", error);
            }
        };

        if (pyme_id) {
            fetchProyectos();
        } else {
            console.error("No se encontró el ID de la pyme en sessionStorage");
        }
    }, [pyme_id]);

    return (
        <div className="components">
            <div className="card" style={{ width: "77.8%" }}>
                <div className="card-body">
                    <h5 className="card-title mb-4">Crear Proyecto</h5>
                    <form className="row g-3 needs-validation" noValidate>
                        <div className='hstack gap-4 p-4'>
                            <div className='border-end d-flex flex-column align-items-center'>
                                <h6 className="card-title mb-4">Imagen del Proyecto</h6>
                                <div className="mb-3 me-4">
                                    <label htmlFor="avatar" className="form-label">Subir foto</label>
                                    <input className="form-control form-control mb-4" id="avatar" type="file" />

                                    <label htmlFor="avatar2" className="form-label">O copiar link</label>
                                    <input type="text" id="avatar2" className="form-control mb-4" />
                                </div>
                            </div>

                            <div className='vstack'>
                                <div className="row mb-3 align-items-center">
                                    <div className="col-md-6">
                                        <label htmlFor="titulo" className="form-label">Título</label>
                                        <input type="text" className="form-control" id="titulo" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="meta" className="form-label">Meta</label>
                                        <input type="text" className="form-control" id="meta" required />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="form-label mb-3">Descripción</label>
                                    <textarea className="form-control" id="descripcion" rows={3} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="sector" className="form-label mb-3">Sector</label>
                                    <select className="form-select" id="sector" required>
                                        <option selected disabled value="">Elija Sector...</option>
                                        <option>Economía</option>
                                        <option>Salud</option>
                                        <option>Educación</option>
                                        <option>Agrícola</option>
                                        <option>Ganadería</option>
                                        <option>Finanzas</option>
                                        <option>Tecnología</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                            <button type="submit" className="btn btn2">
                                Crear Proyecto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};