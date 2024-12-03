const mongoose = require('mongoose');

//Proyecto Schema
const ProjectSchema = new mongoose.Schema({
    pymeId: { type: mongoose.Schema.Types.ObjectId, ref: 'pymes', required: true },
    nombre: { type: String, required: true },
    imagen: { type: String, required: true },
    estado: { type: Number, required: true }, //Estado 1-Proyecto Abierto(verde), 2-Proyecto Ejecucion(amarillo), 3-Proyecto Cerrado(rojo)
    sector: { type: String, required: true },
    descripcion: { type: String },
    meta: { type: Number, required: true },
    recaudado: { type: Number, required: true, default: 0 },
    inversionistas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InvestorProject' }],

    //aprobadasInversion: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InvestorProject' }] // Inversiones aprobadas
});

const ProjectModel = mongoose.model("proyectos", ProjectSchema)
console.log(ProjectModel)
module.exports = ProjectModel