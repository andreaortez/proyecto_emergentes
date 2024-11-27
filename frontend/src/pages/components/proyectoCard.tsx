import react from 'react'

export default function ProyectoCard() {
    return (
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="https://st3.depositphotos.com/27539598/33623/i/950/depositphotos_336231316-stock-photo-vertical-business-background-of-group.jpg" className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className='hstack'>
                            <h5 className="card-title">Proyecto #1</h5>
                            <a className='ms-auto'>
                                <img src="./imagenes/editar.png"
                                    alt="editar"
                                    width="20px"
                                    height="20px"
                                    className='mb-3'
                                />
                            </a>
                        </div>

                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div className='hstack'>
                            <div className='hstack gap-2'>
                                <img src="./imagenes/objetivos.png"
                                    alt="meta"
                                    width="25px"
                                    height="25px"
                                />
                                <span className='textColor'>Meta</span>
                            </div>
                            <div className='hstack gap-2 ms-auto'>
                                <img src="./imagenes/mano.png"
                                    alt="recaudado"
                                    width="30px"
                                    height="30px"
                                />
                                <span className='textColor'>Recaudado</span>
                            </div>
                        </div>
                        <div className='hstack gap-3 mt-4'>
                            <button type="button" className="btn btn2 ms-auto rounded-pill">Ver Proyecto</button>
                            <button type="button" className="btn btn3 rounded-pill">Eliminar</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};