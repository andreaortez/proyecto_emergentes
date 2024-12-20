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
    empresa: string;
    inversionistas: Inversionista[];
}

interface Inversionista {
    id: string;
    userId: string;
    nombre: string;
    apellido: string;
    avatar: string;
}

export default function MiLista() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const investor_id = sessionStorage.getItem("tipo_id");
    const [project_id, setProject_id] = useState<string | null>(null);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const listarProyectos = async () => {
            try {
                console.log("investor_id: ", investor_id);
                const response = await axios.get('http://localhost:3001/getFavoritos', {
                    params: { investor_id }
                });

                console.log(response.data);
                setProyectos(response.data.projects.length > 0 ? response.data.projects.map((proyecto: any) => ({
                    ...proyecto,
                    id: proyecto._id,
                    empresa: proyecto.pymeId.empresa,
                    inversionistas: proyecto.inversionistas.map((inversor: any) => ({
                        id: inversor.investorId._id,
                        userId: inversor.investorId.userId._id,
                        nombre: inversor.investorId.nombre,
                        apellido: inversor.investorId.apellido,
                        avatar: inversor.investorId.userId.avatar
                    }))
                })) : []);

                console.log(response.data.projects.inversionistas)
            } catch (error) {
                console.error("Error al cargar los proyectos:", error);
            }
        };

        if (investor_id) {
            listarProyectos();
        } else {
            console.error("No se encontró el ID de la pyme en sessionStorage");
        }
    }, [investor_id]);

    const handleConfirmDelete = (projectId: string) => {
        console.log("Project ID antes de setear: ", projectId);
        setShowConfirmModal(true);
        setProject_id(projectId);
    };

    const handledeleteProject = async () => {
        if (project_id) {
            try {
                await axios.delete("http://localhost:3001/Proyecto", {
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
                            proyectos={proyectos}
                            titulo="Mi Lista"
                            editar={false} />
                    ) : (//si no hay proyectos
                        <div className="card p-3">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Mi Lista</h5>
                                <p>No tienes proyectos para mostrar.</p>
                            </div>
                        </div>
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