require('dotenv').config();//env
//MongoDB
const express = require('express');
//const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/mongo');
const errorHandler = require('./utils/errorHandler');

//Gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/projectRoutes'));
app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/inversionistaRoutes'));

// Error handling middleware
app.use(errorHandler);

// Start server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



//Missing Endpoints
// app.post("/Enviar", (req, res) => {
//     //con datos de contacto envia correo
// })
// app.put("/Avatar", async (req, res) => {
//     //Modifica la direccion de imagen del avatar
//     //no se si habria un folder o algo para cuando se acceda a una imagen local
// })
// app.post("/Mensajeria", async (req, res) => {
//     //No se como seria Mensajeria exactamente todavia pero aja
// })
//app.post("/Favoritos", async (req, res) => {})
//app.post("/Propuesta", async (req, res) => {})


//Inversionistas