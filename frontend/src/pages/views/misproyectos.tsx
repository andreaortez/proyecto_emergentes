import { useEffect, useState } from 'react';
import axios from 'axios';
import Proyectos from '../components/listarProyectos'
import Modal from '../modals/modal';

interface Proyecto {
    id: string;
    nombre: string;
    imagen: string;
    sector: string;
    meta: number;
    descripcion: string;
    recaudado: string;
    estado: string;
}

export default function MisProyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const pyme_id = sessionStorage.getItem("tipo_id");
    const [project_id, setProject_id] = useState<string | null>(null);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                //console.log("pyme_id desde sessionStorage:", pyme_id);
                const response = await axios.get('http://localhost:3001/ProyectosPyme', {
                    params: { pyme_id }
                });
                setProyectos(response.data.length > 0 ? response.data : []);
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

    const handleConfirmDelete = (projectId: string) => {
        console.log("Project ID antes de setear: ", projectId);
        setShowConfirmModal(true);
        setProject_id(projectId);
    };

    const handledeleteProject = async () => {
        if (project_id) {
            try {
                console.log("project_id" + project_id)
                await axios.delete(`http://localhost:3001/Proyecto/${project_id}`);
                // Éxito
                setTitle('¡Éxito!');
                setBody('Se ha eliminado el proyecto con éxito.');
                setShowModal(true);
                setProyectos((prevProyectos) => prevProyectos.filter(proyecto => proyecto.id !== project_id));
            } catch (error) {
                console.log(error);
                setTitle('¡Error!');
                setBody('Ocurrió un problema al eliminar el proyecto.');
                setShowModal(true);
            }
        } else {
            console.log("no tengo el id");
        }
    }

    return (
        <>
            <div className="components">
                <div style={{ width: "77.8%" }}>
                    {proyectos.length > 0 ? (//imprime los proyectos
                        <Proyectos
                            proyectos={proyectos.map(proyecto => ({
                                ...proyecto,
                                buttons: (
                                    <button
                                        key={proyecto.id}
                                        type="button"
                                        className="btn btn-danger rounded-pill"
                                        onClick={() => {
                                            console.log("Project ID al hacer clic: " + proyecto.id);
                                            handleConfirmDelete(proyecto.id)
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                )
                            }))}
                            titulo="Mis Proyectos"
                            editar={true} />
                    ) : (//si no hay proyectos imprime un mensaje
                        <p>No tienes proyectos para mostrar.</p>
                    )}
                </div>
            </div>

            {/* Modal de confirmación */}
            {showConfirmModal && (
                <Modal
                    title="Confirmación de Eliminación"
                    body="¿Está seguro de que desea eliminar el proyecto?"
                    onClose={() => setShowConfirmModal(false)}
                    footer={
                        <>
                            <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                                Cancelar
                            </button>
                            <button className="btn btn-danger" onClick={handledeleteProject}>
                                Eliminar
                            </button>
                        </>
                    }
                />
            )}

            {/* Modal de resultado*/}
            {showModal && <Modal title={title} body={body} onClose={() => setShowModal(false)} />}
        </>
    );
};