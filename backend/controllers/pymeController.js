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

exports.acceptProposal = async (req, res) => {
    const { proposal_id } = req.body;
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const proposal = await InvestorProjectModel.findById(proposal_id);
        const proyecto = await ProjectModel.findById(proposal.projectId);
        const pymeuser = await PymeModel.findById(proyecto.pymeId);
        const user_investor = await InversionistaModel.findById(proposal.investorId);

        user_investor.monto_bolsa -= proposal.amount;
        proyecto.recaudado += proposal.amount;
        proposal.investmentDate = new Date();
        proposal.status = 'approved';

        proyecto.inversionistas.push(proposal._id);
        user_investor.invest_projects.push(proposal._id);
        user_investor.save_projects.pull(proposal.projectId);

        //Creacion mensaje
        const emisor = pymeuser.userId;
        const receptor = user_investor.userId;
        const mensaje = `La pyme ${pymeuser.empresa} acepto tu propuesta.`;
        await createMessage({ emisor, receptor, mensaje, proposalId: proposal_id });

        await user_investor.save({ session });
        await proposal.save({ session });
        await proyecto.save({ session });

        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            message: "Propuesta aceptada: Inversión registrada correctamente",
            nuevo_monto: user_investor.monto_bolsa,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json("Error al aceptar Propuesta");
    }

}
exports.declineProposal = async (req, res) => {
    const { proposal_id } = req.body;
    try {
        console.log("propuestaId", proposal_id)
        const proposal = await InvestorProjectModel.findById(proposal_id);
        console.log("propuesta", proposal)
        const proyecto = await ProjectModel.findById(proposal.projectId);
        const pymeuser = await PymeModel.findById(proyecto.pymeId);
        //Creacion mensaje
        const emisor = pymeuser.userId;
        const receptor = proposal.investorId;
        const mensaje = `La pyme ${pymeuser.empresa} rechazo tu propuesta.`;
        await createMessage({ emisor, receptor, mensaje, proposalId: proposal_id });
        await InvestorProjectModel.findByIdAndDelete(proposal_id);


        return res.status(200).json({
            message: "Propuesta rechazada",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json("Error al rechazar propuesta");
    }
}