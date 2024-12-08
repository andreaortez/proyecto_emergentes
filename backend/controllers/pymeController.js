const UserModel = require('../models/User');
const PymeModel = require('../models/Pyme');
const MessageModel = require('../models/Message');
const InversionistaModel = require('../models/Inversionista');
const InvestorProjectModel = require('../models/InvestorProject');
const ProjectModel = require('../models/Project');
//const axios = require('axios');

exports.getPyme = async (req, res) => {
    //const { pyme_id } = req.body;
    const { pyme_id } = req.query;

    //console.log("ID recibido en el backend:", user_id);

    if (!pyme_id) {
        return res.status(400).send({ msg: "Falta proveer ID de Pyme" });
    }
    //const userIDObject = new mongoose.Types.ObjectId(user_id);

    try {
        const pyme = await PymeModel.findOne({ _id: pyme_id });
        //const user = usuario;

        if (!pyme) {
            console.log("Pyme no encontrado");
            return res.status(404).send({ msg: "Pyme no encontrado." });
        }
        res.status(200).send({ pyme });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Error al obtener el perfil de la pyme.", error: err.message });
    }
}

exports.getMensajesList = async (req, res) => {
    const { user_id } = req.body;
    //const {  user_id } = req.query;
    if (!user_id) {
        return res.status(400).send({ msg: "Falta proveer ID de usuario" });
    }
    try {
        const mensajes = await MessageModel.find({ receptor: user_id })
            .populate('emisor')
            .sort({ fecha: -1, emisor: 1 });
        let mensajeModificado = [];

        for (let mensaje of mensajes) {
            const inversionista = await InversionistaModel.findOne({ userId: mensaje.emisor._id });
            if (inversionista) {
                mensajeModificado = {
                    ...mensaje.toObject(),
                    emisor: {
                        ...mensaje.emisor.toObject(),
                        nombre: inversionista.nombre,
                        apellido: inversionista.apellido
                    }
                };
            }
        }
        res.status(200).send({ mensajes: mensajeModificado });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Error al obtener propuestas de la pyme.", error: err.message });
    }
}
