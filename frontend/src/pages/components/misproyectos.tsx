import react from 'react'
import PCard from './proyectoCard'

export default function MisProyectos() {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title mb-5">Mis Proyectos</h5>
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
    );
};