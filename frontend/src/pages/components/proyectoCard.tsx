interface Proyecto {
    nombre: string;
    imagen: string;
    meta: number;
    descripcion: string;
    recaudado: number;
}

export default function ProyectoCard({ nombre, imagen, meta, descripcion, recaudado }: Proyecto) {
    return (
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={`${imagen}`} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className='hstack'>
                            <h5 className="card-title">{`${nombre}`}</h5>
                            <a className='ms-auto'>
                                <img src="./imagenes/editar.png"
                                    alt="editar"
                                    width="20px"
                                    height="20px"
                                    className='mb-3'
                                />
                            </a>
                        </div>

                        <p className="card-text">{`${descripcion}`}</p>
                        <div className='hstack'>
                            <div className='hstack gap-2'>
                                <img src="./imagenes/objetivos.png"
                                    alt="meta"
                                    width="25px"
                                    height="25px"
                                />
                                <span className='textColor'>{`${meta}`}</span>
                            </div>
                            <div className='hstack gap-2 ms-auto'>
                                <img src="./imagenes/mano.png"
                                    alt="recaudado"
                                    width="30px"
                                    height="30px"
                                />
                                <span className='textColor'>{`${recaudado}`}</span>
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