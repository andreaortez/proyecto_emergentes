const mongoose = require('mongoose');

//User Schema
const UserSchema = new mongoose.Schema({
    nombre: { type: String,required:true },
    apellido: { type: String,required:true } ,
    contraseña: { type: String,required:true },
    correo: { type: String, unique:true,required:true }, 
    direccion: { type: String },
    rol: { type: String },
    telefono: { type: String,required:true,unique:true },
});

const UserModel = mongoose.model("User", UserSchema)
console.log(UserModel)
module.exports = UserModel