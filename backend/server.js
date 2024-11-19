const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');


// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://tzgarcia16:1234emergentes@cluster0.kpj6q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => {
        if (err instanceof Error) {
            console.error('Error connecting to MongoDB:', err.message);
        } else {
            console.error('Unknown error connecting to MongoDB:', err);
        }
    });


app.post("/IniciarSesion", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email }).then(user => {
        if (user) {
            if (user.contraseña === password) {
                res.json("Sesion Iniciada")
            } else {
                res.json("contraseña incorrecta")
            }
        } else {
            res.json("El usuario no existe")
        }
    })
})

app.post('/Registrarse', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))

})

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

