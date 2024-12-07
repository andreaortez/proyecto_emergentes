const mongoose = require('mongoose');

const InvestorProjectSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto', required: true },
    investorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inversionista', required: true },
    amount: { type: Number, required: true },

    proposedROI: { type: Number, required: true }, // Rendimiento esperado (ej. 10% = 0.1)
    investmentDate: { type: Date, }, // Fecha de inversión default: Date.now
    status: { type: String, enum: ['proposed', 'approved', 'declined'], default: 'proposed' },// Estado de la inversión
    //withdrawalDate: { type: Date }, // Fecha en la que planea retirar
});

const InvestorProjectModel = mongoose.model("InvestorProject", InvestorProjectSchema);
module.exports = InvestorProjectModel;
