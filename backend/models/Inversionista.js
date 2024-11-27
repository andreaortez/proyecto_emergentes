const mongoose = require('mongoose');

//Schema
const InversionistaSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    save_projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    invest_projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InvestorProject' }] // Link to the intermediate table
});

const InversionistaModel = mongoose.model("inversionistas", InversionistaSchema)
console.log(InversionistaModel)
module.exports = InversionistaModel