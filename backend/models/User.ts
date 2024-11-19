import mongoose, { Schema, Document } from 'mongoose';

// User Structure
interface User extends Document {
  nombre: string;
  apellido: string;
  contraseña: string;
  correo: string;
  direccion: string;
  rol: string;
  telefono: string;
}

//User Schema
const UserSchema = new Schema<User>({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  contraseña: { type: String, required: true },
  correo: { type: String, required: true },
  direccion: { type: String, required: true },
  rol: { type: String, required: true },
  telefono: { type: String, required: true },
});

// Create the model with the `IUser` interface
const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
