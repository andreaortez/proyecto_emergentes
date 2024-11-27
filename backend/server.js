require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const UserModel = require('./models/User');
const PymeModel = require('./models/Pyme');
const InversionistaModel = require('./models/Inversionista');
const ProjectModel = require('./models/Project');

//const nodemon = require('nodemon');
// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

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
app.post("/IniciarSesion", (req, res) => {
    const { email, pass } = req.body;
    UserModel.findOne({ correo: email }).then(User => {
        console.log(User+User._id)
        if (User) {
            if (User.contraseña === pass) {
                res.status(200).send({ result:"Sesion Iniciada", user_id:User._id })
            } else {
                res.json("contraseña incorrecta")
            }
        } else {
            res.json("El usuario no existe")
        }
    })
})

app.post('/Registrarse', async (req, res) => {
    const { correo, contraseña, nombre, apellido, telefono, empresa, tipo } = req.body;
    const avatar = "https://cdn-icons-png.flaticon.com/512/4122/4122823.png";
    if (!correo || !contraseña || !nombre || !apellido || !telefono) {
        res.status(400).send("Complete todos los campos requeridos.");
    } else {
        if (tipo == 1) {
            if (empresa) {
                const newUser = await UserModel.create({ avatar, correo, contraseña, nombre, apellido, telefono })
                const pyme = await PymeModel.create({ empresa, userId: newUser._id});
                return res.json(pyme);
            }
            else {
                res.status(400).send("Complete todos los campos requeridos.");
            }
        } else {
            const newUser = await UserModel.create({ correo, contraseña, nombre, apellido, telefono })
            const inversionista = await InversionistaModel.create({ userId: newUser._id});
            return res.json(inversionista);
        }
    } 
})

//Pymes
app.get("/Dashboard", (req, res) => { 
    const { user_id } = req.body;
    UserModel.findOne({ _id: user_id }).then(User => {
        console.log(User)
        const { nombre, apellido, rol } = User;
        res.status(200).send({nombre, apellido, rol});
    }).catch((err) => {res.json(err)});
})
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
app.get("/MiPerfil", (req, res) => { 
    const { user_id } = req.body;
    UserModel.findOne({ _id: user_id }).then(User => {
        console.log(User)
        const { nombre, apellido,correo,telefono,direccion, rol } = User;
        res.status(200).send({nombre, apellido,correo,telefono,direccion, rol});
    }).catch((err) => {res.json(err)});
})

app.post("/Proyecto", async (req, res) => {
    const {pymeId, nombre, imagen, sector, meta, descripcion } = req.body;
    const estado = 1, recaudado = 0;
    if (!nombre || !imagen || !sector||!meta) {
        res.status(400).send("Complete todos los campos requeridos.");
    } else if (!pymeId) { 
        res.status(400).send("Falto enviar pymeId");
    } else {
        const proyecto = await ProjectModel.create({pymeId, nombre, imagen,estado,sector,meta,descripcion,recaudado })
        return res.json("Proyecto Creado");
    } 
})
app.get("/Proyecto", async (req, res) => {
    const { project_id } = req.body;
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
    