const UserModel = require('../models/User');
const PymeModel = require('../models/Pyme');
const InversionistaModel = require('../models/Inversionista');
const admin = require('../config/firebase');

exports.login = async (req, res) => {
    const { email, pass } = req.body;
    try {
        // Buscar en MongoDB
        const user = await UserModel.findOne({ correo: email });

        if (!user) {
            return res.status(404).send("El usuario no existe en MongoDB");
        }

        // Verificar contraseña
        if (user.contraseña !== pass) {
            return res.status(401).send("Contraseña incorrecta");
        }

        // Intentar iniciar sesión en Firebase
        try {
            const userRecord = await admin.auth().getUserByEmail(email);
            // Usuario ya existe en Firebase, retornar éxito
            const pyme = await PymeModel.findOne({ userId: user._id });
            if (pyme) {
                return res.status(200).send({ result: "Sesión Iniciada", user_id: user._id, pyme_id: pyme._id });
            } else {
                const inv = await InversionistaModel.findOne({ userId: user._id });
                return res.status(200).send({ result: "Sesión Iniciada", user_id: user._id, inversionista_id: inv._id });
            }


        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                // Si el usuario no está en Firebase, crearlo, esto es temporal capaz se quite
                const firebaseUser = await admin.auth().createUser({
                    email,
                    password: pass,
                    displayName: `${user.nombre} ${user.apellido}`,
                });

                return res.status(200).send({ result: "Sesión Iniciada", user_id: user._id, firebaseUser });
            }
            throw error;
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor");
    }
};

exports.register = async (req, res) => {
    const { correo, contraseña, nombre, apellido, telefono, empresa, tipo } = req.body;
    const avatar = "https://cdn-icons-png.flaticon.com/512/4122/4122823.png";

    if (!correo || !contraseña || !nombre || !apellido || !telefono) {
        return res.status(400).send("Complete todos los campos requeridos.");
    }

    try {
        // Crear en Firebase
        const firebaseUser = await admin.auth().createUser({
            email: correo,
            password: contraseña,
            displayName: `${nombre} ${apellido}`,
        });

        // Crear en MongoDB
        let newUser;
        if (tipo === 1 && empresa) {
            newUser = await UserModel.create({ avatar, correo, contraseña, nombre, apellido, telefono });
            const pyme = await PymeModel.create({ empresa, userId: newUser._id });
            return res.status(201).json({ pyme, firebaseUser });
        } else if (tipo !== 1) {
            newUser = await UserModel.create({ correo, contraseña, nombre, apellido, telefono });
            const inversionista = await InversionistaModel.create({ userId: newUser._id });
            return res.status(201).json({ inversionista, firebaseUser });
        } else {
            return res.status(400).send("Complete todos los campos requeridos.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Error al registrarse");
    }
};
