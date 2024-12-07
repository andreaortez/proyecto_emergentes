const mongoose = require('mongoose');

//User Schema
const UserSchema = new mongoose.Schema({
    avatar: { type: String },
    contraseña: { type: String, required: true },
    correo: { type: String, unique: true, required: true },
    direccion: { type: String },
    tipo: { type: String },
    telefono: { type: String, required: true, unique: true },
});

const UserModel = mongoose.model("users", UserSchema)
console.log(UserModel)
module.exports = UserModel