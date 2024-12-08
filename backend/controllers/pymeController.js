const UserModel = require('../models/User');
const PymeModel = require('../models/Pyme');
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
    const { pyme_id } = req.body;
    //const { pyme_id } = req.query;

    if (!pyme_id) {
        return res.status(400).send({ msg: "Falta proveer ID de Pyme" });
    }

    try {
        const projects = await ProjectModel.find({ pymeId: pyme_id });
        if (projects.length === 0) {
            return res.status(404).send({ msg: "No se encontraron proyectos para esta pyme" });
        }
        const proposalIds = [];
        for (const project of projects) {
            const proposals = await InvestorProjectModel.find({ projectId: project._id });
            proposals.forEach(proposal => {
                proposalIds.push(proposal._id);
            });
        }
        res.status(200).send({ proposalIDs: proposalIds });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Error al obtener propuestas de la pyme.", error: err.message });
    }
}
