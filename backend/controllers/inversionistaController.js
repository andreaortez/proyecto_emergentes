const UserModel = require('../models/User');
const PymeModel = require('../models/Pyme');
const InversionistaModel = require('../models/Inversionista');
const InvestorProjectModel = require('../models/InvestorProject');
const admin = require('../config/firebase');
const ProjectModel = require('../models/Project');

exports.addInvestor = async (req, res) => {
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
    user_investor.monto_bolsa -= monto;
    await user_investor.save();

    const newInvestment = new InvestorProjectModel({
        projectId: project_id,
        investorId: investor_id,
        amount: monto,
        proposedROI: roi,
        investmentDate: new Date()
    });
    await newInvestment.save();

    const proyecto = await ProjectModel.findById(project_id);
    proyecto.recaudado += monto;
    //console.log("->",proyecto)
    proyecto.inversionistas.push(newInvestment._id);
    await proyecto.save();

    user_investor.save_projects.push(newInvestment._id);
    await user_investor.save();

    return res.status(200).json({
        message: "Inversión registrada correctamente",
        nuevo_monto: user_investor.monto_bolsa,
        investmentId: newInvestment._id
    });
}
