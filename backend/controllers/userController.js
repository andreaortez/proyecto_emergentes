const UserModel = require('../models/User');
const PymeModel = require('../models/Pyme');
const InversionistaModel = require('../models/Inversionista');
const ProjectModel = require('../models/Project');
const InvestorProjectModel = require('../models/InvestorProject');
const fs = require('fs');
const path = require('path');

exports.updateUser = async (req, res) => {
    const { user_id, avatar, nombre, apellido, correo, telefono, direccion, rol } = req.body;

    if (!user_id) {
        return res.status(400).send({ msg: "Se requiere el ID del usuario." });
    }
    console.log("Avatar de Front: ", avatar)

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
};
exports.getUser = async (req, res) => {
    const { user_id } = req.body;
    //console.log("ID recibido en el backend:", user_id);

    if (!user_id) {
        return res.status(400).send({ msg: "Falta proveer ID del usuario." });
    }
    //const userIDObject = new mongoose.Types.ObjectId(user_id);

    try {
        const user = await UserModel.findOne({ _id: user_id });
        //const user = usuario;

        if (!user) {
            console.log("usuario no encontrado");
            return res.status(404).send({ msg: "Usuario no encontrado." });
        }

        const { nombre, apellido, correo, telefono, direccion, rol, avatar } = user;
        console.log("nombre", nombre);
        res.status(200).send({ nombre, apellido, correo, telefono, direccion, rol, avatar });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Error al obtener el perfil del usuario.", error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
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
};