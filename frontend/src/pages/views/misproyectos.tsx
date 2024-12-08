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
    estado: number;
    inversionistas: Inversionista[];
}

interface Inversionista {
    id: string;
    userId: string;
    nombre: string;
    apellido: string;
    avatar: string;
}

export default function MisProyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const pyme_id = sessionStorage.getItem("tipo_id");
    const [project_id, setProject_id] = useState<string | null>(null);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const listarProyectos = async () => {
            try {
                //console.log("pyme_id desde sessionStorage:", pyme_id);
                const response = await axios.get('http://localhost:3001/ProyectosPyme', {
                    params: { pyme_id }
                });

                console.log(response.data.pyme_proyectos);
                setProyectos(response.data.pyme_proyectos.length > 0 ? response.data.pyme_proyectos.map((proyecto: any) => ({
                    ...proyecto,
                    id: proyecto._id
                })) : []);
            } catch (error) {
                console.error("Error al cargar los proyectos:", error);
            }
        };

        if (pyme_id) {
            listarProyectos();
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
                await axios.delete("http://localhost:3001/Proyecto/", {
                    params: { project_id }
                });
                setShowConfirmModal(false);
                setTitle('¡Éxito!');
                setMessage('Se ha eliminado el proyecto con éxito.');
                setShowModal(true);
                //actualizar los proyectos sin el proyecto eliminado
                setProyectos((prevProyectos) => prevProyectos.filter(proyecto => proyecto.id !== project_id));
            } catch (error) {
                setShowConfirmModal(false);
                setTitle('¡Error!');
                setMessage('Ocurrió un problema al eliminar el proyecto.');
                setShowModal(true);
            }
        } else {
            console.log("No tengo el ID del proyecto");
        }
    }

    return (
        <>
            <div className="components">
                <div style={{ width: "77.8%" }}>
                    {proyectos.length > 0 ? (//imprime los proyectos
                        <Proyectos
                            proyectos={proyectos.map((proyecto) => ({
                                ...proyecto,
                                buttons: (
                                    <button
                                        key={proyecto.id}
                                        type="button"
                                        className="btn btn-danger rounded-pill"
                                        onClick={() => {
                                            handleConfirmDelete(proyecto.id);
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
                    message="¿Está seguro de que desea eliminar el proyecto?"
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
            {showModal && <Modal title={title} message={message} onClose={() => setShowModal(false)} />}
        </>
    );
};