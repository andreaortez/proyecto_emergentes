import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Modal from '../modals/modal'

export default function contactanos() {
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        mensaje: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmitForm = async () => {
        try {
            //console.log("pyme_id desde sessionStorage:", pyme_id);

            await axios.post('http://localhost:3001/Send', {
                nombre: formData.nombre,
                correo: formData.correo,
                mensaje: formData.mensaje,
            });

            setTitle('Mensaje');
            setMessage("El mensaje fue enviado al correo correctamente.");
            setShowModal(true);
        } catch (error) {
            setTitle('Error al enviar correo');
            setMessage("Ocurrió un problema al enviar el correo. Inténtalo nuevamente.");
            setShowModal(true);
        }
    }


    return (
        <div className="contactanos" id="contactanos">
            <div id="formStyle">
                <h2 id="contactTitle">Contáctanos</h2>
                <form className="center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmitForm();
                    }}>
                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="Nombre" aria-label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="Correo" aria-label="Correo" name="correo" value={formData.correo} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder="Mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange}></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn" id="contactButton" type="submit" >
                            <div>Enviar</div>
                            <img src="imagenes/enviar-mensaje.png" alt="Contactanos" width="20" height="20" />
                        </button>
                    </div>

                </form>
            </div>
            <div>
                <img src="https://img.freepik.com/foto-gratis/mujer-que-trabaja-computadora-casa_1303-29023.jpg?t=st=1732143516~exp=1732147116~hmac=78511a54d84748ff2d97a76a00a269f47289b41c320097224e17643c0f575037&w=1380" alt="Contactanos" width="450" height="300" id="imgRoundness" />
            </div>
            {/* Modal */}
            {showModal && <Modal title={title} message={message} onClose={() => setShowModal(false)} />}
        </div>
    );
};