import { useState } from 'react';
import axios from 'axios';
import Modal from '../modals/modal'

export default function CrearProyectos() {
    const pyme_id = sessionStorage.getItem("tipo_id");
    const [nombre, setNombre] = useState<string>('');
    const [imagen, setImagen] = useState<string>('');
    const [sector, setSector] = useState<string>('');
    const [meta, setMeta] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    //const [telefono2, setTelefono] = useState<string>('');
    //const [direccion2, setDireccion] = useState<string>('');

    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleCreateProject = async () => {
        if (pyme_id) {
            try {
                //console.log("pyme_id desde sessionStorage:", pyme_id);
                console.log("pyme id" + pyme_id)
                const metaInt = parseInt(meta);

                const response = await axios.post('http://localhost:3001/Proyecto', {
                    pymeId: pyme_id,
                    nombre: nombre,
                    imagen: imagen,
                    sector: sector,
                    meta: metaInt,
                    descripcion: descripcion,
                }).then(response => {
                    // Éxito
                    setTitle('Proyecto creado éxitosamente');
                    setMessage(`El proyecto "${nombre}" se ha creado correctamente.`);
                    setShowModal(true);
                });
            } catch (error) {
                setTitle('Error al crear el proyecto');
                setMessage('Ocurrió un problema al crear el proyecto. Inténtalo nuevamente.');
                setShowModal(true);
            }
        } else {
            setTitle('Error de identificación');
            setMessage('No se encontró un ID válido para la pyme.');
            setShowModal(true);
        }
    }

    return (
        <div className="components">
            <div className="card" style={{ width: "77.8%", height: '45.5vw' }}>
                <div className="card-body d-flex flex-column justify-content-center">
                    <h5 className="card-title mb-4">Crear Proyecto</h5>
                    <form className="row g-3 needs-validation" noValidate>
                        <div className='hstack p-4'>
                            {/* imagen */}
                            <div className='d-flex flex-column align-items-center justify-content-center text-center'>
                                <h6 className="card-title mb-4">Imagen del Proyecto</h6>
                                <div className="mb-3 me-4">
                                    <label htmlFor="avatar2" className="form-label">Copiar link de la imagen</label>
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
                                            <option value="" disabled>Elija Sector...</option>
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
                            <button type="button" className="btn btn2" onClick={handleCreateProject} >
                                Crear Proyecto
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal */}
            {showModal && <Modal title={title} message={message} onClose={() => setShowModal(false)} />}
        </div>
    );
};