const mongoose = require('mongoose');

const InvestorProjectSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto', required: true },
    investorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inversionista', required: true },
    amount: { type: Number, required: true },
    investmentDate: { type: Date, default: Date.now }
});

const InvestorProjectModel = mongoose.model("InvestorProject", InvestorProjectSchema);
module.exports = InvestorProjectModel;
