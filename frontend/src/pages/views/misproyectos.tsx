import react from 'react'
import PCard from '../components/proyectoCard'

export default function MisProyectos() {
    return (
        <div className="components">
            <div className="card" style={{ width: "77.8%" }}>
                <div className="card-body">
                    <h5 className="card-title mb-4">Mis Proyectos</h5>
                    <div className='row'>
                        <div className="col">
                            <PCard />
                            <PCard />
                        </div>
                        <div className="col">
                            <PCard />
                            <PCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};