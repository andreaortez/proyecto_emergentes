import React from 'react';
import Portada from '../components/portada'
import UserName from '../components/userName'
import axios from 'axios';
import CategoryCard from '../components/categoryCard'
import { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
} from 'chart.js';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale
);
type Sector = 'Economía' | 'Salud' | 'Educación' | 'Agrícola' | 'Ganadería' | 'Finanzas' | 'Tecnología' | 'Arte';
interface Proyecto {
    id: string;
    nombre: string;
}
interface GraficaData {
    montos: {
        recaudado: number;
        brecha: number;
        meta: number;
    };
    intervalos: {
        diario: number;
        semanal: number;
        mensual: number;
    };
    recaudacionMensual: {
        year: number;
        month: number;
        total: number;
    }[];
}
interface TopSector {
    sector: Sector;
    total: number;
}

interface GraficaSector {
    sectoresTop: TopSector[];
}

export default function dashboard() {
    const tipo = sessionStorage.getItem("tipo");
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [proyectoSelected, setProyecto] = useState<string>("");

    const [graficaData, setGraficaData] = useState<GraficaData | null>(null);
    const [graficaSector, setGraficaSector] = useState<GraficaSector | null>(null);

    const [pyme_id, setPymeId] = useState<string | null>(null);
    const [investor_id, setInversionistaId] = useState<string | null>(null);

    const user_id = sessionStorage.getItem("user_id");

    useEffect(() => {
        if (tipo === "Inversionista") {
            setInversionistaId(sessionStorage.getItem("tipo_id"));
        } else {//pyme
            setPymeId(sessionStorage.getItem("tipo_id"));
        }
    }, [tipo, pyme_id, investor_id]);
    useEffect(() => {
        GraphSectorData();
    }, []);

    //listar proyectos para pymes
    useEffect(() => {
        const listProyectos = async () => {
            try {
                if (tipo === "Pyme") {
                    const response = await axios.get('http://localhost:3001/ListarProyectos', {
                        params: { pyme_id }
                    });

                    if (response.data.proyectos) {
                        setProyectos(response.data.proyectos.length > 0 ? response.data.proyectos.map((proyecto: any) => ({
                            id: proyecto._id,
                            nombre: proyecto.nombre
                        })) : []);
                    }
                } else {
                    const response = await axios.get('http://localhost:3001/ProyectosInversionista', {
                        params: { investor_id }
                    });

                    if (response.data.proyectos) {
                        setProyectos(response.data.proyectos.length > 0 ? response.data.proyectos.map((proyecto: any) => ({
                            id: proyecto._id,
                            nombre: proyecto.nombre
                        })) : []);
                    }
                }

            } catch (error) {
                console.error("Error al cargar los proyectos:", error);
            }
        };

        if (pyme_id || investor_id) {
            listProyectos();
        } else {
            console.error("No existe un pyme_id ");

        }
    }, [tipo, pyme_id, investor_id]);

    async function fetchProjectData(projectId: string) {
        try {
            console.log("P:", projectId)
            const response = await axios(`http://localhost:3001/Graphs`, { params: { project_id: projectId } });
            console.log("Graficas", response.data)
            if (response.status !== 200) {
                throw new Error('Error al obtener datos del proyecto');
            }
            setGraficaData(response.data)
        } catch (error) {
            console.error('Error al llamar a la API:', error);
        }
    }
    async function GraphSectorData() {
        try {

            const response = await axios(`http://localhost:3001/GraphsSector`);
            console.log("GraficasSector", response.data)
            if (response.status !== 200) {
                throw new Error('Error al obtener datos del proyecto');
            }
            setGraficaSector(response.data)
        } catch (error) {
            console.error('Error al llamar a la API:', error);
        }
    }

    const handleProyectoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //setProyecto(e.target.value);
        const selectedId = e.target.value;
        setProyecto(selectedId);
        fetchProjectData(selectedId);
    };

    // Datos para gráficos
    const lineData = graficaData
        ? {
            labels: graficaData.recaudacionMensual.map((item: any) => `${item.month}/${item.year}`),
            datasets: [
                {
                    label: 'Recaudación Mensual',
                    data: graficaData.recaudacionMensual.map((item: any) => item.total),
                    fill: true,
                    borderColor: '#06b09a',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    tension: 0.3,
                },
            ],
        }
        : null;

    const doughnutData = graficaData
        ? {
            // Primer gráfico: Ganancias Diarias
            daily: {
                labels: ['Ganancia Diaria'],
                datasets: [
                    {
                        data: [graficaData.intervalos.diario, 100 - graficaData.intervalos.diario],
                        backgroundColor: ['#055E63', '#06b09a']
                    },
                ],
            },
            // Segundo gráfico: Ganancias Semanales
            weekly: {
                labels: ['Ganancia Semanal'],
                datasets: [
                    {
                        data: [graficaData.intervalos.semanal, 100 - graficaData.intervalos.semanal],
                        backgroundColor: ['#055E63', '#06b09a']
                    },
                ],
            },
            // Tercer gráfico: Ganancias Mensuales
            monthly: {
                labels: ['Ganancia Mensual'],
                datasets: [
                    {
                        data: [graficaData.intervalos.mensual, 100 - graficaData.intervalos.mensual],
                        backgroundColor: ['#055E63', '#06b09a']
                    },
                ],
            },
            // Cuarto gráfico: Recaudado vs Brecha
            recaudo: {
                labels: ['Recaudado'],
                datasets: [
                    {
                        data: [graficaData.montos.recaudado, graficaData.montos.brecha],
                        backgroundColor: ['#055E63', '#06b09a'],
                    },
                ],
            },
        }
        : null;


    return (
        <>
            <div className='vstack'>
                <Portada />
                <div className='p-4'>
                    <UserName />
                </div>
            </div>

            <div className='p-4 graficas'>
                <select className="form-select" value={proyectoSelected} onChange={handleProyectoChange} required >
                    <option value="" disabled>Elija un Proyecto...</option>
                    {proyectos.map((proyecto) => (
                        <option key={proyecto.id} value={proyecto.id}>
                            {proyecto.nombre}
                        </option>
                    ))}
                </select>

                <div className="linegraph" style={{ backgroundColor: 'white' }}>
                    {lineData && (
                        <Line
                            data={lineData}
                            options={{
                                responsive: true,
                            }}
                        />
                    )}
                </div>

                <div className='statistics'>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="piegraph mb-4">
                                {/* Gráfico Diario */}
                                {doughnutData && doughnutData.daily && (
                                    <Doughnut
                                        data={doughnutData.daily}
                                        options={{
                                            responsive: true,
                                        }}
                                    />
                                )}
                            </div>
                            <div className="piegraph">
                                {/* Gráfico Semanal */}
                                {doughnutData && doughnutData.weekly && (
                                    <Doughnut
                                        data={doughnutData.weekly}
                                        options={{
                                            responsive: true,
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="piegraph mb-4">
                                {/* Gráfico Mensual */}
                                {doughnutData && doughnutData.monthly && (
                                    <Doughnut
                                        data={doughnutData.monthly}
                                        options={{
                                            responsive: true,
                                        }}
                                    />
                                )}
                            </div>
                            <div className="piegraph">
                                {/* Gráfico Recaudado vs Brecha */}
                                {doughnutData && doughnutData.recaudo && (
                                    <Doughnut
                                        data={doughnutData.recaudo}
                                        options={{
                                            responsive: true,
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Graficos Sectores*/}
            <div>
                {graficaSector?.sectoresTop.map((item, index) => (
                    <CategoryCard key={index} sector={item.sector} value={item.total} />
                ))}
            </div>
        </>
    );
};