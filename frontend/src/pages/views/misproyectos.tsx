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
    nombre: string;
    apellido: string;
    avatar: string;
}

export default function MisProyectos() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [project_id, setProject_id] = useState<string | null>(null);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const tipo = sessionStorage.getItem("tipo");
    const [pyme_id, setPymeId] = useState<string | null>(null);
    const [investor_id, setInvestorId] = useState<string | null>(null);

    const [editarProyecto, setEditar] = useState<boolean>(false);

    useEffect(() => {
        if (tipo === "Inversionista") {
            setInvestorId(sessionStorage.getItem("tipo_id"));
            setEditar(false);
        } else {//pyme
            setPymeId(sessionStorage.getItem("tipo_id"));
            setEditar(true);
        }
    }, [tipo]);


    useEffect(() => {
        const listarProyectos = async () => {
            try {
                if (tipo === "Pyme" && pyme_id) {
                    const response = await axios.get('http://localhost:3001/ProyectosPyme', {
                        params: { pyme_id }
                    });

                    console.log(response.data.pyme_proyectos);
                    setProyectos(response.data.pyme_proyectos.length > 0 ?
                        response.data.pyme_proyectos.map((proyecto: any) => ({
                            ...proyecto,
                            id: proyecto._id,
                            empresa: proyecto.pymeId.empresa
                        })) : []);
                } else if (tipo === "Inversionista" && investor_id) {
                    const response = await axios.get('http://localhost:3001/ProyectosInversionista', {
                        params: { investor_id: investor_id }
                    });

                    // Guarda todos los IDs en un array
                    const proyectosIds = response.data.proyectos.map((proyecto: any) => proyecto.id);

                    if (proyectosIds.length > 0) {
                        const allProyectos = await Promise.all(
                            proyectosIds.map(async (id: string) => {
                                const res = await axios.get('http://localhost:3001/Proyecto', {
                                    params: { project_id: id }
                                });
                                return {
                                    ...res.data,
                                    empresa: res.data.pymeId.empresa,
                                    inversionistas: res.data.inversionistas.map((inv: any) => ({
                                        id: inv._id,
                                        nombre: inv.nombre,
                                        apellido: inv.apellido,
                                        avatar: inv.userId.avatar
                                    }))
                                };
                            })
                        );

                        console.log(allProyectos);
                        setProyectos(allProyectos);
                    } else {
                        setProyectos([]);
                    }
                }
            } catch (error) {
                console.log("Error al cargar los proyectos:", error);
            }
        };

        if (pyme_id || investor_id) {
            listarProyectos();
        } else {
            console.error("No se encontró el ID de la pyme en sessionStorage");
        }
    }, [tipo, pyme_id, investor_id]);

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
                            editar={editarProyecto} />
                    ) : (//si no hay proyectos
                        <div className="card p-3">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Mis Proyectos</h5>
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