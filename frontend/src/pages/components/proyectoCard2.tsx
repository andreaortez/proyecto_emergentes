import react from 'react'

interface Proyecto {
    nombre: string;
    imagen: string;
    sector: string;
    descripcion: string;
}

export default function ProyectoCard({ nombre, imagen, sector, descripcion }: Proyecto) {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="hstack">
                    <div className="d-flex justify-content-center align-items-center" style={{ width: '200px', height: '200px' }}>
                        <img src={`${imagen}`} alt="Imagen"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{`${nombre}`}</h5>

                        <p className="card-text">{`${descripcion}`}</p>
                        <div className='hstack gap-3 mt-3'>
                            <button type="button" className="btn btn4 rounded-pill">Ver Proyecto</button>
                            <button type="button" className="btn btn2 rounded-pill">Agregar a mi lista</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};