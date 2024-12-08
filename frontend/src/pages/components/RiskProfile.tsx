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
    const riskColors: { [key in RiskProfileData['nivelDeRiesgo']]: string } = {
        bajo: "green",
        medio: "orange",
        alto: "red",
    };
    const data = {
        labels: ['Bajo', 'Medio', 'Alto'], // Etiquetas de los niveles
        datasets: [
            {
                label: 'Nivel de Riesgo',
                data: [profile.nivelDeRiesgo === 'bajo' ? 0 : profile.nivelDeRiesgo === 'medio' ? 1 : 2],
                borderColor: riskColors[profile.nivelDeRiesgo], // Color de la línea
                backgroundColor: riskColors[profile.nivelDeRiesgo],
                tension: 0.1, // Para hacer que la línea sea suave
                fill: false, // No llenar el área debajo de la línea
                pointRadius: 5, // Tamaño de los puntos
                pointBackgroundColor: riskColors[profile.nivelDeRiesgo],
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
                max: 2,
            },
        },
    };



    //const { nivelDeRiesgo, estadoDeFinanciamiento, estadoDeInversionistas, puntajeDeRiesgo } = profile;

    return (
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
            <h3>Perfil de Riesgo</h3>
            <div style={{ display: "flex", alignItems: "center" }}>
                {/* Aquí colocamos el gráfico de líneas */}
                <div style={{ width: "40%", marginRight: "20px" }}>
                    <Line data={data} options={options} />
                </div>
                {/* Información del perfil */}
                <div>
                    <p>
                        Nivel de Riesgo:{" "}
                        <span style={{ color: riskColors[profile.nivelDeRiesgo] }}>
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
