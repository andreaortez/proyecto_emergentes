//.env
require('dotenv').config();

//MongoDB
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");

const admin = require("firebase-admin");
const serviceAccount = require("./config/firebase-admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


//Modelos de Base de Datos
const UserModel = require('./models/User');
const PymeModel = require('./models/Pyme');
const InversionistaModel = require('./models/Inversionista');
const ProjectModel = require('./models/Project');
const InvestorProjectModel = require('./models/InvestorProject');


//const nodemon = require('nodemon');
// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

//Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

//Implementacion IA


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI).then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => {
        if (err instanceof Error) {
            console.error('Error connecting to MongoDB:', err.message);
        } else {
            console.error('Unknown error connecting to MongoDB:', err);
        }
    });

///LogIn-SignUp
app.post("/IniciarSesion", async (req, res) => {
    const { email, pass } = req.body;

    console.log(email + pass);

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
});

app.post('/Registrarse', async (req, res) => {
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
});

//Pymes
app.put("/User", async (req, res) => {
    const { user_id, avatar, nombre, apellido, correo, telefono, direccion, rol } = req.body;

    if (!user_id) {
        return res.status(400).send({ msg: "Se requiere el ID del usuario." });
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            user_id,
            { avatar, nombre, apellido, correo, telefono, direccion, rol },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ msg: "Usuario no encontrado." });
        }

        res.status(200).send(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Error al actualizar el usuario.", error: err.message });
    }
});

app.post("/MiPerfil", async (req, res) => {
    const { user_id } = req.body;
    console.log("ID recibido en el backend:", user_id);

    if (!user_id) {
        return res.status(400).send({ msg: "Falta proveer ID del usuario." });
    }
    //const userIDObject = new mongoose.Types.ObjectId(user_id);

    try {
        const user = await UserModel.findOne({ _id: user_id });
        //const user = usuario;

        if (!user) {
            console.log("Se entro a usuario no encontrado");
            return res.status(404).send({ msg: "Usuario no encontrado." });
        }

        const { nombre, apellido, correo, telefono, direccion, rol, avatar } = user;
        console.log("nombre", nombre);
        res.status(200).send({ nombre, apellido, correo, telefono, direccion, rol, avatar });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Error al obtener el perfil del usuario.", error: err.message });
    }
});

app.post("/Proyecto", async (req, res) => {
    try {
        const { pymeId, nombre, imagen, sector, meta, descripcion } = req.body;
        const estado = 1, recaudado = 0;
        if (!nombre || !imagen || !sector || !meta) {
            res.status(400).send("Complete todos los campos requeridos.");
        } else if (!pymeId) {
            res.status(400).send("Falto enviar pymeId");
        } else {
            const proyecto = await ProjectModel.create({ pymeId, nombre, imagen, estado, sector, meta, descripcion, recaudado, owner: pymeId, })
            pyme.proyectos.push(proyecto._id);
            await pyme.save();
            return res.status(201).json({
                message: "Proyecto creado exitosamente.",
                proyecto,
            });
        }
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).send("Ocurrió un error al crear el proyecto.");
    }
});
app.get("/Proyecto", async (req, res) => {
    const { project_id } = req.query;
    try {
        if (project_id) {
            const proyecto = await ProjectModel.findById(project_id);
            if (!proyecto) {
                return res.status(404).send("Proyecto no encontrado.");
            }
            res.status(200).json(proyecto);
        } else {
            res.status(404).json("Se debe proveer un ID del Proyecto");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los proyectos.");
    }
});

app.put("/Proyecto", async (req, res) => {
    const { project_id } = req.body;
    const { nombre, imagen, sector, meta, descripcion } = req.body;
    try {
        if (project_id) {
            if (!nombre || !imagen || !sector || !meta) {
                res.status(400).send("Complete todos los campos requeridos.");
            } else {
                const updatedProject = await ProjectModel.findByIdAndUpdate(
                    project_id,
                    { nombre, imagen, sector, meta, descripcion, estado, recaudado },
                    { new: true, runValidators: true } // Return the updated document and use validators in schema
                );

                if (!updatedProject) {
                    return res.status(404).send("Proyecto no encontrado.");
                }
                res.status(200).json(updatedProject);
            }

        } else {
            res.status(404).json("Se debe proveer un ID del Proyecto");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar el proyecto.");
    }
});

app.delete("/Proyecto", async (req, res) => {
    const { project_id } = req.params;
    try {
        if (project_id) {
            const deletedProject = await ProjectModel.findByIdAndDelete(project_id);

            if (!deletedProject) {
                return res.status(404).send("Proyecto no encontrado.");
            }
            res.status(200).send("Proyecto eliminado exitosamente.");
        } else {
            res.status(404).json("Se debe proveer un ID del Proyecto");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar el proyecto.");
    }
});

app.get("/ProyectosPyme", async (req, res) => {
    const { pyme_id } = req.query;
    try {
        if (pyme_id) {
            const pyme_proyectos = await ProjectModel.find({ pymeId: pyme_id });
            console.log("->" + pyme_proyectos)
            if (pyme_proyectos.length === 0) {
                return res.status(404).send("No se han creado proyectos");
            }
            res.status(200).json(pyme_proyectos);
        } else {
            res.status(404).json("Se debe proveer un ID de la pyme");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los proyectos.");
    }
});

app.get("/Proyectos", async (req, res) => {
    try {
        const proyectos = await ProjectModel.aggregate([
            { $group: { _id: "$sector", proyectos: { $push: "$$ROOT" } } }
        ]);

        const response = {
            economia: [],
            salud: [],
            educacion: [],
            agricola: [],
            ganaderia: [],
            finanzas: [],
            tecnologia: []
        };

        proyectos.forEach(item => {
            if (response.hasOwnProperty(item._id.toLowerCase())) {
                response[item._id.toLowerCase()] = item.proyectos;
            }
        });

        res.status(200).json(response);

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los proyectos.");
    }
});

app.delete('/User', async (req, res) => {
    const { user_id } = req.body;

    try {
        // Buscar el usuario para identificar su rol
        if (!user_id) {
            return res.status(305).json({ message: 'Se debe proveer el id user' });
        }
        const user = await UserModel.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Iniciar una transacción para garantizar consistencia
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const isPyme = await PymeModel.exists({ userId: user_id }).session(session);
            const isInversionista = await InversionistaModel.exists({ userId: user_id }).session(session);
            // Eliminar datos relacionados según el rol del usuario
            if (isPyme) {
                // Eliminar la pyme
                const pyme = await PymeModel.find({ userId: user_id }, null, { session });
                const proyectos = await ProjectModel.find({ pymeId: pyme._id }).session(session);
                if (proyectos.length > 0) {
                    await ProjectModel.deleteMany({ pymeId: pyme._id }).session(session);
                }

                await PymeModel.deleteMany({ userId: user_id }, { session });
            } else if (isInversionista) {
                // Eliminar las inversiones del inversionista
                const inversionista = await InversionistaModel.findOne({ userId: user_id });

                // Eliminar las inversiones en la tabla intermedia 'InvestorProject'
                const inversiones = await InvestorProjectModel.find({ investorId: inversionista._id }).session(session);
                if (inversiones.length > 0) {
                    await InvestorProjectModel.deleteMany({ investorId: inversionista._id }).session(session);
                }

                // Eliminar la relación de inversión en los proyectos
                const proyectos = await ProjectModel.find({ inversionistas: inversionista._id }).session(session);
                if (proyectos.length > 0) {
                    await ProjectModel.updateMany(
                        { inversionistas: inversionista._id },
                        { $pull: { inversionistas: inversionista._id } },
                        { session }
                    );
                }

                // Eliminar el registro del inversionista
                await InversionistaModel.deleteOne({ userId: user_id }, { session });
            }

            // Eliminar el usuario de Firebase
            console.log("->" + user.correo)
            const user_fb = await admin.auth().getUserByEmail(user.correo); // Obtiene el usuario por correo
            await admin.auth().deleteUser(user_fb.uid);

            // Eliminar el usuario de MongoDB
            await UserModel.deleteOne({ _id: user_id }, { session });

            // Confirmar la transacción
            await session.commitTransaction();
            session.endSession();

            res.json({ message: 'Usuario y datos relacionados eliminados con éxito' });
        } catch (error) {
            // Revertir transacción si algo falla
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: 'Error al eliminar usuario', details: error.message });
    }
});

//Missing Endpoints
app.post("/Enviar", (req, res) => {
    //con datos de contacto envia correo 
})
app.put("/Avatar", async (req, res) => {
    //Modifica la direccion de imagen del avatar
    //no se si habria un folder o algo para cuando se acceda a una imagen local
})
app.post("/Mensajeria", async (req, res) => {
    //No se como seria Mensajeria exactamente todavia pero aja
})

//Inversionistas


// Start server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
