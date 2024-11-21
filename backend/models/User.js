const mongoose = require('mongoose');


//User Schema
const UserSchema = new mongoose.Schema({
    nombre: { type: String,required:true },
    // apellido: { type: String,required:true } ,
    contraseña: { type: String,required:true },
    correo: { type: String, unique:true,required:true }, 
    // direccion: { type: String,required:true },
    // rol: { type: String,required:true },
    // telefono: { type: String,required:true },
});

// Create the model with the `IUser` interface
const UserModel = mongoose.model("users", UserSchema)
console.log(UserModel)
module.exports = UserModel