import React from 'react';

interface iconos {
    imagen: string;
    texto: string;
}
export default function Iconos({ imagen, texto }: iconos) {
    return (
        <div className='hstack gap-2'>
            <a>
                <img src={imagen}
                    alt="meta"
                    width="20px"
                    height="20px"
                    className='mb-3'
                />
            </a>
            <p className="card-text mb-3"><small className="textColor">{`${texto}`}</small></p>
        </div>
    );
};
