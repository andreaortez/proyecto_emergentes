const UserModel = require('../models/User');
const PymeModel = require('../models/Pyme');
const InversionistaModel = require('../models/Inversionista');
const InvestorProjectModel = require('../models/InvestorProject');
const ProjectModel = require('../models/Project');
const MessageModel = require('../models/Message')

exports.proposalMsg = async (req, res) => {
    try {
        const { pymeuser_id, investoruser_id, amount, proposedROI, project_id, proposalId } = req.body;
        const ROIString = (proposedROI * 100);
        const investor = await UserModel.find({ _id: investoruser_id });
        const proyecto = await ProjectModel.find({ _id: project_id });

        const message = `El usuario ${investor.nombre} ${investor.apellido} te acaba te enviar una propuesta.\n
        Donde quiere invertir ${amount} lps por un ROI de ${ROIString}% en tu Proyecto ${proyecto.nombre}. \n
        Indicar si desea aceptar o rechazar la propuesta`;

        await MessageModel.create({
            proposalId: proposalId,
            mensaje: message,
            fecha: new Date(), // Fecha de mensaje
            emisor: investoruser_id,
            receptor: pymeuser_id,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json("Error al crear Mensaje Propuesta");
    }
}
exports.acceptMsg = async (req, res) => {
    try {
        const { proposal_id } = req.body;
        const proposal = await InvestorProjectModel.find({ _id: proposal_id });
        //proposal.change status to approved
        const proyecto = await ProjectModel.find({ _id: proposal.projectId });
        const pymeuser = await PymeModel.find({ _id: proyecto.pymeId });
        const pyme = await UserModel.findById(pymeuser.userId);

        const message = `El usuario ${pyme.nombre} ${pyme.apellido} acepto tu propuesta.`;

        await MessageModel.create({
            mensaje: message,
            fecha: new Date(), // Fecha de mensaje
            emisor: investoruser_id,
            receptor: pymeuser_id,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json("Error al crear Mensaje Propuesta Aceptada");
    }
}
exports.declineMsg = async (req, res) => {
    try {
        const { proposal_id } = req.body;
        const proposal = await InvestorProjectModel.find({ _id: proposal_id });
        const proyecto = await ProjectModel.find({ _id: proposal.projectId });
        const pymeuser = await PymeModel.find({ _id: proyecto.pymeId });
        const pyme = await UserModel.findById(pymeuser.userId);

        const message = `El usuario ${pyme.nombre} ${pyme.apellido} rechazo tu propuesta.`;

        await MessageModel.create({
            mensaje: message,
            fecha: new Date(), // Fecha de mensaje
            emisor: investoruser_id,
            receptor: pymeuser_id,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json("Error al crear Mensaje Propuesta Rechazada");
    }
}

// exports.metodo = async (req, res) => {
//     try {

//     } catch (error) {
//         console.error(error);
//         res.status(500).json("Error al crear Mensaje Propuesta Rechazada");
//     }
// }
