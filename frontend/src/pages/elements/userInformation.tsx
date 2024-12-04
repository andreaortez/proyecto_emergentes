import React from 'react';

interface atributos {
    icono: string;
    titulo: string;
    texto: string;
}

export default function UserInfo({ icono, titulo, texto }: atributos) {
    return (
        <div className="card-text border-bottom mt-4">
            <div className='hstack gap-3'>
                <img src={icono}
                    alt="meta"
                    width="30px"
                    height="30px"
                    className='d-inline-block align-text-top'
                />
                <p className="mb-3 lightText">{titulo}</p>
            </div>
            <p className="mb-4">{texto}</p>
        </div>
    );
};
