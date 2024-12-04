const UserModel = require('../models/User');
const PymeModel = require('../models/Pyme');
const InversionistaModel = require('../models/Inversionista');
const InvestorProjectModel = require('../models/InvestorProject');
const admin = require('../config/firebase');
const ProjectModel = require('../models/Project');

exports.addInvestor = async (req, res) => {
    const { project_id, investor_id, roi, monto } = req.body;
    const session = await mongoose.startSession();

    if (!roi || !monto) {
        return res.status(404).send("Se debe llenar todos los campos");
    } else if (!investor_id || !project_id) {
        return res.status(205).send("Falta proveer datos para addInvestor/agregarInversionista");
    }
    const user_investor = await InversionistaModel.findById(investor_id);
    if (user_investor.monto_bolsa < monto) {
        return res.status(400).json({ error: "Fondos insuficientes en la bolsa" });
    }
    session.startTransaction();
    try {
        const proyecto = await ProjectModel.findById(project_id);
        user_investor.monto_bolsa -= monto;
        proyecto.recaudado += monto;

        const newInvestment = new InvestorProjectModel({
            projectId: project_id,
            investorId: investor_id,
            amount: monto,
            proposedROI: roi,
            investmentDate: new Date()
        });

        proyecto.inversionistas.push(newInvestment._id);
        user_investor.invest_projects.push(newInvestment._id);
        user_investor.save_projects.pull(project_id);
        await user_investor.save({ session });
        await newInvestment.save({ session });
        await proyecto.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "Inversión registrada correctamente",
            nuevo_monto: user_investor.monto_bolsa,
            investmentId: newInvestment._id
        });

    } catch (error) {

    }

}

exports.addFavorite = async (req, res) => {

    const { project_id, investor_id } = req.body;
    if (!investor_id || !project_id) {
        return res.status(205).send("Falta proveer datos para addFavorite/agregarFavorito");
    }
    try {
        const user_investor = await InversionistaModel.findById(investor_id);
        user_investor.save_projects.push(project_id);
        return res.status(201).send("Se añadio el proyecto a Favoritos");

    } catch (error) {
        console.error(error);
        res.status(500).json("Error al añadir a Favoritos");
    }


}
