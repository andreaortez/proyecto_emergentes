import React from 'react';
import { useState } from 'react';

interface Proyecto {
    id: string;
    nombre: string;
    imagen: string;
    sector: string;
    meta: number;
    descripcion: string;
    recaudado: string;
    estado: number;
    onClose: () => void;
}

export default function EditarProyecto({ id, nombre, imagen, sector, meta, descripcion, recaudado, estado, onClose }: Proyecto) {
    const pyme_id = sessionStorage.getItem("tipo_id");
    const [nombre2, setNombre] = useState<string>('');
    const [imagen2, setImagen] = useState<string>('');
    const [sector2, setSector] = useState<string>('');
    const [meta2, setMeta] = useState<string>('');
    const [descripcion2, setDescripcion] = useState<string>('');
    //const [telefono2, setTelefono] = useState<string>('');
    //const [direccion2, setDireccion] = useState<string>('');

    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Proyecto</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form className="row g-3 needs-validation" noValidate>
                            <div className='hstack p-4'>
                                {/* imagen */}
                                <div className='d-flex flex-column align-items-center'>
                                    <h6 className="card-title mb-4">Imagen del Proyecto</h6>
                                    <div className="mb-3 me-4">
                                        <label htmlFor="avatar" className="form-label">Subir foto</label>
                                        <input className="form-control form-control mb-4" id="avatar" type="file" />

                                        <label htmlFor="avatar2" className="form-label">O copiar link</label>
                                        <input type="text" id="avatar2" className="form-control mb-4" onChange={(e) => setImagen(e.target.value)} />
                                    </div>
                                </div>

                                {/* informacion */}
                                <div className='vstack border-start'>
                                    <div className='ms-4'>
                                        <div className="row mb-3 align-items-center">
                                            <div className="col-md-6">
                                                <label htmlFor="titulo" className="form-label">Título</label>
                                                <input type="text" className="form-control" id="titulo" onChange={(e) => setNombre(e.target.value)} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="meta" className="form-label">Meta</label>
                                                <input type="text" className="form-control" id="meta" onChange={(e) => setMeta(e.target.value)} required />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="descripcion" className="form-label mb-3">Descripción</label>
                                            <textarea className="form-control" id="descripcion" rows={3} onChange={(e) => setDescripcion(e.target.value)} required />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="sector" className="form-label mb-3">Sector</label>
                                            <select className="form-select" id="sector" onChange={(e) => setSector(e.target.value)} required >
                                                <option selected disabled value="">Elija Sector...</option>
                                                <option>Economía</option>
                                                <option>Salud</option>
                                                <option>Educación</option>
                                                <option>Agrícola</option>
                                                <option>Ganadería</option>
                                                <option>Finanzas</option>
                                                <option>Tecnología</option>
                                                <option>Arte</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <button type="button" className="btn btn2" >
                                    Crear Proyecto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};