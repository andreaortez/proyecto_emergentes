import react from 'react'

export default function ProyectoCard() {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="hstack">
                    <div className="d-flex justify-content-center align-items-center" style={{ width: '200px', height: '200px' }}>
                        <img src="https://st3.depositphotos.com/27539598/33623/i/950/depositphotos_336231316-stock-photo-vertical-business-background-of-group.jpg" alt="Imagen"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Proyecto #1</h5>

                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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