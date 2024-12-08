import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface RiskProfileData {
    nivelDeRiesgo: "bajo" | "medio" | "alto";
    estadoDeFinanciamiento: string;
    estadoDeInversionistas: string;
    puntajeDeRiesgo: number;
}

interface RiskProfileProps {
    profile: RiskProfileData | null; // Permitir que sea nulo
}

const RiskProfile: React.FC<RiskProfileProps> = ({ profile }) => {
    // Validar si `profile` está definido antes de intentar renderizarlo
    if (!profile) {
        return <p>No se pudo cargar el perfil de riesgo.</p>;
    }

    const data = {
        labels: ['Bajo', 'Medio', 'Alto'],
        datasets: [
            {
                label: 'Nivel de Riesgo',
                data: [
                    profile.nivelDeRiesgo === 'bajo' ? 1 : 0,
                    profile.nivelDeRiesgo === 'medio' ? 1 : 0,
                    profile.nivelDeRiesgo === 'alto' ? 1 : 0,
                ],
                borderColor: "red", // Establecer el color de la línea a rojo
                backgroundColor: "rgba(255, 0, 0, 0.1)", // Fondo transparente rojo
                tension: 0.4,
                pointRadius: 2,
                pointBackgroundColor: "red", // Color de los puntos
                borderWidth: 3, // Grosor de la línea
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Ocultar la leyenda
            },
        },
        scales: {
            x: {
                display: true, // Mantener los ejes si es necesario
            },
            y: {
                display: true,
                min: 0,
                max: 2, // Escalar para mejor visibilidad
            },
        },
        elements: {
            line: {
                tension: 0.4,
            },
            point: {
                radius: 8, // Puntos más visibles
            },
        },
    };

    return (
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
            <h3>Perfil de Riesgo</h3>
            <div style={{ display: "flex", alignItems: "center" }}>
                {/* Aquí colocamos el gráfico de líneas */}
                <div style={{ width: "60%", height: "200px", marginRight: "20px" }}>
                    <Line data={data} options={options} />
                </div>

                {/* Información del perfil */}
                <div>
                    <p>
                        Nivel de Riesgo:{" "}
                        <span style={{ color: "red" }}>
                            {profile.nivelDeRiesgo.toUpperCase()}
                        </span>
                    </p>
                    <p>Estado de Financiamiento: {profile.estadoDeFinanciamiento}</p>
                    <p>Estado de Inversionistas: {profile.estadoDeInversionistas}</p>
                    <p>Puntaje de Riesgo: <strong>{profile.puntajeDeRiesgo}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default RiskProfile;
