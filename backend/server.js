require('dotenv').config();//env
//MongoDB
const express = require('express');
const path = require('path');
//const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/mongo');
const errorHandler = require('./utils/errorHandler');

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
app.use('/',require('./routes/pymeRoutes'))

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Error handling middleware
app.use(errorHandler);

// Start server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







//Missing Endpoints
// app.post("/Mensajeria", async (req, res) => {
//     //No se como seria Mensajeria exactamente todavia pero aja
// })
//app.post("/Favoritos", async (req, res) => {})
//app.post("/Propuesta", async (req, res) => {})


//Inversionistas