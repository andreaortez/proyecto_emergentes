//.env
require('dotenv').config();

//MongoDB
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Firebase
const { initializeApp } = require("firebase/app");
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } = require('firebase/auth');
const { getAnalytics } = require("firebase/analytics");
const firebaseConfig = {
    apiKey: "AIzaSyAp6fQAui5RaZe1hS-r9v4da7RZO_WGkvg",
    authDomain: "emergentes-821c5.firebaseapp.com",
    projectId: "emergentes-821c5",
    storageBucket: "emergentes-821c5.firebasestorage.app",
    messagingSenderId: "810284799347",
    appId: "1:810284799347:web:3906edfc2fefbb129fe106",
    measurementId: "G-D825F0L32F"
};
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

//const nodemon = require('nodemon');
// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

//Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

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
                return res.status(200).send({ result: "Sesión Iniciada", user_id: user._id,inversionista_id: inv._id });
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



// app.post("/IniciarSesion", (req, res) => {
//     const { email, pass } = req.body;
//     UserModel.findOne({ correo: email }).then(User => {
//         console.log(User+User._id)
//         if (User) {
//             if (User.contraseña === pass) {
//                 res.status(200).send({ result:"Sesion Iniciada", user_id:User._id })
//             } else {
//                 res.json("contraseña incorrecta")
//             }
//         } else {
//             res.json("El usuario no existe")
//         }
//     })
// })

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


// app.post('/Registrarse', async (req, res) => {
//     const { correo, contraseña, nombre, apellido, telefono, empresa, tipo } = req.body;
//     const avatar = "https://cdn-icons-png.flaticon.com/512/4122/4122823.png";
//     if (!correo || !contraseña || !nombre || !apellido || !telefono) {
//         res.status(400).send("Complete todos los campos requeridos.");
//     } else {
//         if (tipo == 1) {
//             if (empresa) {
//                 const newUser = await UserModel.create({ avatar, correo, contraseña, nombre, apellido, telefono })
//                 const pyme = await PymeModel.create({ empresa, userId: newUser._id});
//                 return res.json(pyme);
//             }
//             else {
//                 res.status(400).send("Complete todos los campos requeridos.");
//             }
//         } else {
//             const newUser = await UserModel.create({ correo, contraseña, nombre, apellido, telefono })
//             const inversionista = await InversionistaModel.create({ userId: newUser._id});
//             return res.json(inversionista);
//         }
//     } 
// })

//Pymes
app.put("/User", (req, res) => {
    const { user_id } = req.body;
    UserModel.findByIdAndUpdate(
        user_id, 
        { avatar,nombre, apellido,correo,telefono,direccion, rol }, 
        { new: true, runValidators: true } // Return the updated document and use validators in schema
    ).then(User => {
        console.log(User)
        res.status(200).send(User);
    }).catch((err) => {res.json(err)});
 })
 
 app.post("/MiPerfil", (req, res) => { 
    const { user_id } = req.body; // Cambiar req.body por req.query
    
    if (!user_id) {
        return res.status(400).json({ error: "user_id es requerido" });
    }
    
    UserModel.findOne({ _id: user_id }).then(User => {
        if (User) {
            const { nombre, apellido, correo, telefono, direccion, rol, avatar } = User;
            res.status(200).send({ nombre, apellido, correo, telefono, direccion, rol, avatar });
        } else {
            res.status(404).send({ error: "Usuario no encontrado" });
        }
    }).catch((err) => {
        res.status(500).send({ error: "Error del servidor", detalles: err });
    });
});


app.post("/Proyecto", async (req, res) => {
    try {
        const {pymeId, nombre, imagen, sector, meta, descripcion } = req.body;
        const estado = 1, recaudado = 0;
        if (!nombre || !imagen || !sector||!meta) {
            res.status(400).send("Complete todos los campos requeridos.");
        } else if (!pymeId) { 
            res.status(400).send("Falto enviar pymeId");
        } else {
            const proyecto = await ProjectModel.create({pymeId, nombre, imagen,estado,sector,meta,descripcion,recaudado,owner: pymeId, })
            pyme.proyectos.push(proyecto._id);
            await pyme.save();
            return res.status(201).json({
                message: "Proyecto creado exitosamente.",
                proyecto,
            });
        }        
    }catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).send("Ocurrió un error al crear el proyecto.");
    }  
})
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
})

app.put("/Proyecto", async (req, res) => {
    const { project_id } = req.body;
    const { nombre, imagen, sector, meta, descripcion} = req.body;
    try {
        if (project_id) {
            if (!nombre || !imagen || !sector||!meta) {
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
            console.log("->"+pyme_proyectos)
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
})

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
        return res.status(200).send({
            msg: "Proyectos enviados",
            economia: response.economia,
            salud: response.salud,
            educacion: response.educacion,
            agricola: response.agricola,
            ganaderia: response.ganaderia,
            finanzas: response.finanzas,
            tecnologia: response.tecnologia
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los proyectos.");
    }
})

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




// const newUser = await UserModel.create({ correo, contraseña, nombre, apellido, telefono })
//     .then(users => res.json(users))
//     .catch(err => res.json(err)) 

// console.log(email + "-" + pass)
    // const nuevoUsuario = new UserModel({
    //     nombre: "Carlos López",
    //     correo: "carlos.garcia@example.com",
    //     contraseña: "miSuperContraseña",
    //   });
      
    //   nuevoUsuario.save()
    //     .then(() => {
    //       console.log("Usuario insertado exitosamente");
    //       mongoose.connection.close(); // Cerrar conexión después de insertar
    //     })
    //     .catch(err => {
    //       console.error("Error al insertar usuario:", err);
    //     });
    // res.json("so")
    