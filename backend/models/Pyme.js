const mongoose = require('mongoose');

//Pyme Schema
const PymeSchema = new mongoose.Schema({
    empresa: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    proyectos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});

const PymeModel = mongoose.model("pymes", PymeSchema)
console.log(PymeModel)
module.exports = PymeModel