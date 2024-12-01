const mongoose = require('mongoose');

//Proyecto Schema
const ProjectSchema = new mongoose.Schema({
    pymeId: { type: mongoose.Schema.Types.ObjectId, ref: 'pymes', required: true },
    nombre: { type: String, required: true },
    imagen: { type: String, required: true },
    estado: { type: Number, required: true }, //Estado 1-Proyecto Abierto(verde), 2-Proyecto Ejecucion(amarillo), 3-Proyecto Cerrado(rojo)
    sector: { type: String, required: true },
    meta: { type: Number, required: true },
    descripcion: { type: String },
    recaudado: { type: Number, required: true, default: 0 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'pymes', required: true },
    inversionistas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InvestorProject' }]
});

const ProjectModel = mongoose.model("proyectos", ProjectSchema)
console.log(ProjectModel)
module.exports = ProjectModel