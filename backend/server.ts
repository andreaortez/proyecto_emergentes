import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User';
import UserModel from './models/User';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err: unknown) => {
        if (err instanceof Error) {
            console.error('Error connecting to MongoDB:', err.message);
        } else {
            console.error('Unknown error connecting to MongoDB:', err);
        }
    });

// Example route
/**
 * app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});
 */
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email }).then(user => {
        if (user) {
            if (user.contraseña === password) {
                res.json("Sesion Iniciada")
            } else {
                res.json("contraseñan incorrecta")
            }
        } else {
            res.json("El usuario no existe")
        }
    })
})

app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))

})

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
