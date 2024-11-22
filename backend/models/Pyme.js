const mongoose = require('mongoose');

//Pyme Schema
const PymeSchema = new mongoose.Schema({
    empresa: { type: String,required:true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const PymeModel = mongoose.model("pymes", PymeSchema)
console.log(PymeModel)
module.exports = PymeModel