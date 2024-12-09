import React from 'react';
import { FiActivity, FiHeart, FiBook, FiTrendingUp, FiShoppingCart, FiDollarSign, FiCpu, } from "react-icons/fi";
import { VscEdit } from "react-icons/vsc";
type Sector = 'Economía' | 'Salud' | 'Educación' | 'Agrícola' | 'Ganadería' | 'Finanzas' | 'Tecnología' | 'Arte';
interface CategoryCardProps {
    sector: Sector;
    value: number;
}

const colors: Record<Sector, string> = {
    Economía: '#16a085',
    Salud: '#e74c3c',
    Educación: '#8e44ad',
    Agrícola: '#2ecc71',
    Ganadería: '#f39c12',
    Finanzas: '#2980b9',
    Tecnología: '#4b8bfc',
    Arte: '#e84393',
};
const icons: Record<Sector, JSX.Element> = {
    Economía: <FiTrendingUp />,
    Salud: <FiHeart />,
    Educación: <FiBook />,
    Agrícola: <FiShoppingCart />,
    Ganadería: <FiActivity />,
    Finanzas: <FiDollarSign />,
    Tecnología: <FiCpu />,
    Arte: <VscEdit />,
};

const CategoryCard: React.FC<CategoryCardProps> = ({ sector, value }) => {
    return (
        <div style={{
            background: '#f9f9f9'
        }}>
            {/* Sector */}
            <div>
                {sector}
            </div>

            {/* Icon Sector */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <div style={{ color: colors[sector], fontSize: '24px' }}>
                    {icons[sector]}
                </div>
                <h4 style={{ marginLeft: '10px', color: colors[sector] }}>L.{value}</h4>
            </div>

            {/* Icono Grafico */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <FiActivity size={80} color={colors[sector]} />
            </div>

        </div>
    );
}

export default CategoryCard;

