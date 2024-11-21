import React from 'react';

export default function contactanos() {
    return (
        <div className="contactanos" id="contactanos">
            <div id="formStyle">
                <h2 id="contactTitle">Contáctanos</h2>
                <form className="center">
                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="Nombre" aria-label="Nombre" />
                    </div>
                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="Correo" aria-label="Correo" />
                    </div>
                    <div className="mb-4">
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder="Mensaje"></textarea>
                    </div>
                    <button className="btn" id="contactButton" type="submit">
                        <div>Enviar</div>
                        <img src="imagenes/enviar-mensaje.png" alt="Contactanos" width="20" height="20" />
                    </button>
                </form>
            </div>
            <div>
                <img src="https://img.freepik.com/foto-gratis/mujer-que-trabaja-computadora-casa_1303-29023.jpg?t=st=1732143516~exp=1732147116~hmac=78511a54d84748ff2d97a76a00a269f47289b41c320097224e17643c0f575037&w=1380" alt="Contactanos" width="450" height="300" id="imgRoundness" />
            </div>
        </div>
    );
};