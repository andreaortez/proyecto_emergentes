const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    proposalId: { type: mongoose.Schema.Types.ObjectId, ref: 'InvestorProject' },
    mensaje: { type: String, required: true },
    fecha: { type: Date, default: Date.now }, // Fecha de mensaje
    emisor: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    receptor: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const MessageModel = mongoose.model("Mensajes", MessageSchema);
module.exports = MessageModel;
