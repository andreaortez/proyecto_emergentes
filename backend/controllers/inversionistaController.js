const UserModel = require('../models/User');
const PymeModel = require('../models/Pyme');
const InversionistaModel = require('../models/Inversionista');
const InvestorProjectModel = require('../models/InvestorProject');
const ProjectModel = require('../models/Project');
const axios = require('axios');

const createMessage = async ({ emisor, receptor, mensaje, proposalId }) => {
    if (!emisor || !receptor || !mensaje) {
        throw new Error('Datos incompletos para crear el mensaje.');
    }
    try {
        return await MessageModel.create({
            proposalId,
            mensaje,
            fecha: new Date(),
            emisor,
            receptor,
        });
    } catch (error) {
        console.error('Error al crear mensaje:', error);
        throw error;
    }
};

exports.makeProposal = async (req, res) => {
    const { project_id, investor_id, roi, monto } = req.body;
    if (!roi || !monto) {
        return res.status(404).send("Se debe llenar todos los campos");
    } else if (!investor_id || !project_id) {
        return res.status(205).send("Falta proveer datos para addInvestor/agregarInversionista");
    }
    const user_investor = await InversionistaModel.findById(investor_id);
    if (user_investor.monto_bolsa < monto) {
        return res.status(400).json({ error: "Fondos insuficientes en la bolsa" });
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const propuesta = await InvestorProjectModel.create({
            projectId: project_id,
            investorId: investor_id,
            amount: monto,
            proposedROI: roi,
            status: 'proposed'
        })
        const proyecto = await ProjectModel.findById(project_id);
        const pymeuser = await PymeModel.findById(proyecto.pymeId);
        const receptor = pymeuser.userId;
        const investoruser = await InversionistaModel.findById(investor_id);
        const emisor = investoruser.userId;

        //Mensaje creacion
        const ROIString = (roi * 100);
        const investor = await UserModel.findById(investoruser.userId);
        const mensaje = `El usuario ${investor.nombre} ${investor.apellido} te acaba te enviar una propuesta.\n
        Donde quiere invertir ${monto} lps por un ROI de ${ROIString}% en tu Proyecto ${proyecto.nombre}. \n
        Indicar si desea aceptar o rechazar la propuesta`;
        await createMessage({emisor, receptor, mensaje, proposalId: propuesta._id });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "Propuesta creada correctamente",
            propuesta_id: propuesta._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json("Error al crear Propuesta");
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
        const pyme = await UserModel.findById(pymeuser.userId);
        const user_investor = await InversionistaModel.findById(proposal.investorId);

        user_investor.monto_bolsa -= proposal.amount;
        proyecto.recaudado += proposal.amount;
        proposal.investmentDate = new Date();
        proposal.status = 'approved';

        proyecto.inversionistas.push(proposal._id);
        user_investor.invest_projects.push(proposal._id);
        user_investor.save_projects.pull(proposal.projectId);

        //Creacion mensaje
        const emisor = pyme._id;
        const receptor = user_investor.userId;
        const mensaje = `El usuario ${pyme.nombre} ${pyme.apellido} acepto tu propuesta.`;
        await createMessage(emisor, receptor, mensaje);

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
        
        const proposal = await InvestorProjectModel.findById(proposal_id );
        const proyecto = await ProjectModel.findById(proposal.projectId);
        const pymeuser = await PymeModel.findById(proyecto.pymeId);
        const pyme = await UserModel.findById(pymeuser.userId);
        //Creacion mensaje
        const emisor = pyme._id;
        const receptor = proposal.investorId;
        const mensaje = `El usuario ${pyme.nombre} ${pyme.apellido} rechazo tu propuesta.`;
        await createMessage(emisor, receptor, mensaje);
        await InvestorProjectModel.findByIdAndDelete(proposal_id);

       
        return res.status(200).json({
            message: "Propuesta rechazada",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json("Error al rechazar propuesta");
    }
}

exports.addFavorite = async (req, res) => {

    const { project_id, investor_id } = req.body;
    if (!investor_id || !project_id) {
        return res.status(205).send("Falta proveer datos para addFavorite/agregarFavorito");
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user_investor = await InversionistaModel.findById(investor_id);
        user_investor.save_projects.push(project_id);
        user_investor.save({ session })
        await session.commitTransaction();
        session.endSession();
        return res.status(201).send("Se añadio el proyecto a Favoritos");

    } catch (error) {
        console.error(error);
        res.status(500).json("Error al añadir a Favoritos");
    }


}


 // axios.post('http://localhost:3001/mensajeRechazada',
//     { proposal_id });
        

        // axios.post('http://localhost:3001/mensajeAceptada',
        //     { proposal_id });


        // axios.post('http://localhost:3001/mensajePropuesta',
        //     { pymeuser_id, investoruser_id, amount, proposedROI, project_id, proposalId });
        //investmentDate: new Date()
//await newInvestment.save({ session });
        
//Try catch transacciones
// const session = await mongoose.startSession();
// session.startTransaction();
// try {
//     // Operaciones de base de datos...
//     await session.commitTransaction();
// } catch (error) {
//     await session.abortTransaction();
//     console.error(error);
//     throw error;
// } finally {
//     session.endSession();
// }
