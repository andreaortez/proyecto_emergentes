const mongoose = require('mongoose');


//User Schema
const UserSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    contraseña: String,
    correo: String,
    direccion: String,
    rol: String,
    telefono: String,
});

// Create the model with the `IUser` interface
const UserModel = mongoose.model("User", UserSchema)
console.log(UserModel)
module.exports = UserModel