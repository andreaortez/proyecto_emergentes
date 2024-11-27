const bcrypt = require('bcryptjs');
const admin = require("firebase-admin");
const mongoose = require("mongoose");
const UserModel = require("./models/User"); // Adjust the path if needed
require("dotenv").config();

// Firebase Admin SDK initialization
const serviceAccount = require("./config/firebase-admin.json");// Path to your downloaded key file
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Error connecting to MongoDB:", err));

const saltRounds = 10;

const migrateUsersToFirebase = async () => {
    try {
        const users = await UserModel.find({}); // Fetch all users
        console.log(`Found ${users.length} users in MongoDB`);

        for (const user of users) { // Use `for...of` to handle async/await properly
            try {
                await admin.auth().getUserByEmail(user.correo);
                console.log(`Usuario ${user.correo} ya existe en Firebase`);
            } catch (error) {
                if (error.code === 'auth/user-not-found') {
                    const hashedPassword = await bcrypt.hash(user.contraseña, saltRounds); // Hash the password
                    await admin.auth().createUser({
                        email: user.correo,
                        password: hashedPassword,
                        displayName: `${user.nombre} ${user.apellido}`,
                    });
                    console.log(`Usuario ${user.correo} migrado a Firebase`);
                } else {
                    console.error(`Error migrando usuario ${user.correo}:`, error);
                }
            }
        }
    } catch (err) {
        console.error("Error during migration:", err);
    } finally {
        mongoose.connection.close(); // Close MongoDB connection when done
    }
};

// Execute migration
migrateUsersToFirebase();
