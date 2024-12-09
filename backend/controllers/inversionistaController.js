const UserModel = require('../models/User');
const PymeModel = require('../models/Pyme');
const InversionistaModel = require('../models/Inversionista');
const InvestorProjectModel = require('../models/InvestorProject');
const ProjectModel = require('../models/Project');
const MessageModel = require('../models/Message');
const mongoose = require('mongoose');
//const axios = require('axios');

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

exports.getInversionista = async (req, res) => {
    const { investor_id } = req.query;
    //const { investor_id } = req.query;
    //console.log("ID recibido en el backend:", user_id);

    if (!investor_id) {
        return res.status(400).send({ msg: "Falta proveer ID del inversionista" });
    }
    //const userIDObject = new mongoose.Types.ObjectId(user_id);

    try {
        const investor = await InversionistaModel.findOne({ _id: investor_id });
        //const user = usuario;

        if (!investor) {
            console.log("inversionista no encontrado");
            return res.status(404).send({ msg: "Inversionista no encontrado." });
        }
        res.status(200).send({ investor });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Error al obtener el perfil del inversionista.", error: err.message });
    }
}

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
        const investor = await InversionistaModel.findById(investor_id);
        const emisor = investor.userId;

        //Mensaje creacion
        const ROIString = (roi * 100);
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

exports.getNotificacionesList = async (req, res) => {
    //const { user_id } = req.body;
    const { user_id } = req.query;
    if (!user_id) {
        return res.status(400).send({ msg: "Falta proveer ID de usuario" });
    }
    try {
        const mensajes = await MessageModel.find({ receptor: user_id })
            .populate('emisor') 
            .sort({ fecha: -1, emisor: 1 });
        res.status(200).send(mensajes);
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Error al obtener notificaciones", error: err.message });
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

exports.getFavorite = async (req, res) => {
    const { investor_id } = req.query;
    //const {  investor_id } = req.query;
    const investor = await InversionistaModel.findById(investor_id)
        .populate({
            path: 'save_projects',
            model: 'proyectos', 
            populate: [
                {
                    path: 'inversionistas',
                    populate: [
                        {
                            path: 'investorId',
                            model: 'inversionistas',
                            populate: {
                                path: 'userId',
                                model: 'users',
                                select: 'avatar ',
                            },
                        },
                    ],
                },
                {
                    path: 'pymeId',
                    model: 'pymes',
                    select: 'empresa'
                }
            ],
        })
        
    return res.status(200).send(
        {
            success: true,
            projects: investor.save_projects
        }
    );

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
