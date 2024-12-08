const UserModel = require('../models/User');
const PymeModel = require('../models/Pyme');
const InversionistaModel = require('../models/Inversionista');
//const admin = require('../config/firebase');
const { auth } = require("../config/firebase"); // Importar instancia de Firebase Auth
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const nodemailer = require('nodemailer');
const firebase = require("../config/firebase");

// Configurar el transporte para Outlook o Gmail
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Cambia a 'Outlook' si usas Outlook
    auth: {
        user: 'tatigarcia1611@gmail.com', // Tu correo
        pass: process.env.Pass, // Tu contraseña o token de aplicación
    },
});

// Verificar conexión con el servidor de correo
transporter.verify((error, success) => {
    if (error) {
        console.log('Error al conectar con el servicio de correo:', error);
    } else {
        console.log('El servidor de correo está listo para enviar mensajes');
    }
});

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
            const firebaseUser = await signInWithEmailAndPassword(auth, email, pass);
            // Usuario ya existe en Firebase, retornar éxito
            const pyme = await PymeModel.findOne({ userId: user._id });
            if (pyme) {
                return res.status(200).send({ result: "Sesión Iniciada", user_id: user._id, pyme_id: pyme._id });
            } else {
                const inv = await InversionistaModel.findOne({ userId: user._id });
                return res.status(200).send({ result: "Sesión Iniciada", user_id: user._id, inversionista_id: inv._id });
            }


        } catch (error) {
            // if (error.code === 'auth/user-not-found') {
            //     // Si el usuario no está en Firebase, crearlo, esto es temporal capaz se quite
            //     const firebaseUser = await admin.auth().createUser({
            //         email,
            //         password: pass,
            //         displayName: `${user.nombre} ${user.apellido}`,
            //     });

            //     return res.status(200).send({ result: "Sesión Iniciada", user_id: user._id, firebaseUser });
            // }
            console.error("Error al iniciar sesión en Firebase:", error);
            return res.status(401).send("Error al iniciar sesión en Firebase");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor");
    }
};

exports.register = async (req, res) => {
    const { correo, contraseña, telefono, empresa, nombre, apellido, monto, tipo } = req.body;
    const avatar = "https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png";

    if (!correo || !contraseña || !telefono) {
        return res.status(400).send("Complete todos los campos requeridos.");
    } else if (!tipo) {
        return res.status(205).send("Falto proveer el tipo");
    }

    try {
        // Crear en Firebase
        const firebaseResponse = await createUserWithEmailAndPassword(auth, correo, contraseña);
        const firebaseUser = {
            uid: firebaseResponse.user.uid,
            email: firebaseResponse.user.email,
            displayName: `${nombre} ${apellido}`,
        };

        // Crear en MongoDB
        let newUser;
        if (tipo === "Pyme" && empresa) {
            newUser = await UserModel.create({ avatar, correo, contraseña, telefono });
            const pyme = await PymeModel.create({ empresa, userId: newUser._id });
            return res.status(201).json({result:"success" , pyme, firebaseUser });
        } else if (tipo == "Inversionista" && nombre && apellido && monto) {
            newUser = await UserModel.create({ avatar, correo, contraseña, telefono });
            const inversionista = await InversionistaModel.create({ nombre, apellido, monto_bolsa: monto, userId: newUser._id });
            return res.status(201).json({result:"success" , inversionista, firebaseUser });
        } else {
            return res.status(400).send("Complete todos los campos requeridos.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Error al registrarse");
    }
};
exports.sendEmail = async (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    // Configurar el correo a enviar
    const mailOptions = {
        from: correo, // Correo desde el cual se envía
        to: 'tatigarcia1611@gmail.com', // Correo del destinatario
        subject: `Nuevo mensaje de ${nombre}`, // Asunto del correo
        text: `Has recibido un mensaje de ${nombre} (${correo}):\n\n${mensaje}`,
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).json({ error: 'Error al enviar el correo' });
        } else {
            console.log('Correo enviado:', info.response);
            res.status(200).json({ message: 'Correo enviado exitosamente' });
        }
    });
};