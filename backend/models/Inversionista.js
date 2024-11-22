const mongoose = require('mongoose');

//Schema
const InversionistaSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const InversionistaModel = mongoose.model("inversionistas", InversionistaSchema)
console.log(InversionistaModel)
module.exports = InversionistaModel