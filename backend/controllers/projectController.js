const ProjectModel = require('../models/Project');
const Project = require('../models/Project');
const PymeModel = require('../models/Pyme');
const InvestorProject = require('../models/InvestorProject');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const InvestorProjectModel = require('../models/InvestorProject');

exports.createProject = async (req, res) => {
    try {
        const { pymeId, nombre, imagen, sector, meta, descripcion } = req.body;
        const estado = 1, recaudado = 0;
        if (!nombre || !imagen || !sector || !meta) {
            res.status(400).send("Complete todos los campos requeridos.");
        } else if (!pymeId) {
            res.status(400).send("Falto enviar pymeId");
        } else {
            const pyme = await PymeModel.findById(pymeId);
            const proyecto = await ProjectModel.create({ pymeId, nombre, imagen, estado, sector, meta, descripcion, recaudado, owner: pymeId, })
            pyme.proyectos.push(proyecto._id);
            await pyme.save();
            return res.status(201).json({
                message: "Proyecto creado exitosamente.",
                proyecto,
            });
        }
    } catch (error) {
        console.error("Error creando un proyecto:", error);
        return res.status(500).send("Ocurrió un error al crear el proyecto.");
    }
};
exports.getProject = async (req, res) => {
    const { project_id } = req.body;
    try {
        if (project_id) {
            const proyecto = await ProjectModel.findById(project_id)
                .populate({
                    path: 'inversionistas',
                    populate: {
                        path: 'investorId',
                        model: 'inversionistas'
                    }
                });

            if (!proyecto) {
                return res.status(404).send("Proyecto no encontrado.");
            }
            const proyectoTransformado = {
                ...proyecto.toObject(), // Convierte el documento de Mongoose a un objeto plano
                inversionistas: proyecto.inversionistas.map(inv => inv.investorId) // Extrae solo los datos de `investorId`
            };
            res.status(200).json(proyectoTransformado);
        } else {
            res.status(404).json("Se debe proveer un ID del Proyecto");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los proyectos.");
    }
};
exports.updateProject = async (req, res) => {
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
};
exports.deleteProject = async (req, res) => {
    const { project_id } = req.params;
    try {
        if (project_id) {
            const deletedProject = await ProjectModel.findByIdAndDelete(project_id);
            if (!deletedProject) {
                return res.status(404).send("Proyecto no encontrado.");
            }

            await PymeModel.updateMany(
                { proyectos: project_id },
                { $pull: { proyectos: project_id } }
            );

            const investorProjects = await InvestorProjectModel.find({ projectId: project_id });
            const investorProjectIds = investorProjects.map(investment => investment._id);

            await InvestorProjectModel.deleteMany({ projectId: project_id });

            await InversionistaModel.updateMany(
                { save_projects: { $in: investorProjectIds } },
                { $pull: { save_projects: { $in: investorProjectIds } } }
            );
            await InversionistaModel.updateMany(
                { invest_projects: { $in: investorProjectIds } },
                { $pull: { invest_projects: { $in: investorProjectIds } } }
            );

            res.status(200).send("Proyecto eliminado exitosamente.");
        } else {
            res.status(404).json("Se debe proveer un ID del Proyecto");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar el proyecto.");
    }
};
exports.getProjectsByPyme = async (req, res) => {
    //const { pyme_id } = req.query;
    const { pyme_id } = req.body;
    try {
        if (pyme_id) {
            const proyectos_id = await ProjectModel.find({ pymeId: pyme_id }, { _id: 1 });
            const proyectos = await ProjectModel.find({ pymeId: pyme_id }).populate({
                path: 'inversionistas',
                populate: {
                    path: 'investorId',
                    model: 'inversionistas'
                }
            });
            const pyme_proyectos = proyectos.map(proyecto => {
                const proyectoPlano = proyecto.toObject();
                return {
                    ...proyectoPlano,
                    inversionistas: proyecto.inversionistas.map(inv => inv.investorId)
                };
            });

            res.status(200).json(
                {
                    success: true,
                    pyme_proyectos,
                    proyectos_id
                }
            );
        } else {
            res.status(400).json("Se debe proveer un ID de la pyme");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los proyectos.");
    }
};
exports.getAllProjects = async (req, res) => {
    try {
        const proyectos = await ProjectModel.aggregate([
            {
                $lookup: {
                    from: "investorprojects",
                    localField: "_id",
                    foreignField: "projectId",
                    as: "inversionistas"
                }
            },
            {
                $lookup: {
                    from: "inversionistas",
                    localField: "inversionistas.investorId",
                    foreignField: "_id",
                    as: "detallesInversionistas"
                }
            },
            {
                $addFields: {
                    inversionistas: "$detallesInversionistas"
                }
            },
            {
                $project: {
                    "detallesInversionistas": 0
                }
            },
            {
                $group: {
                    _id: "$sector",
                    proyectos: {
                        $push: "$$ROOT" // Preserva todos los datos del proyecto
                    }
                }
            }
        ]);
        const proyectos_id = await ProjectModel.aggregate([
            {
                $project: { _id: 1 }
            }
        ]);

        const response = {
            economía: [],
            salud: [],
            educación: [],
            agrícola: [],
            ganadería: [],
            finanzas: [],
            tecnología: [],
            arte: []
        };

        proyectos.forEach(item => {
            if (response.hasOwnProperty(item._id.toLowerCase())) {
                response[item._id.toLowerCase()] = item.proyectos;
            }
        });
        //console.log(proyectos_id)
        res.status(200).json(
            {
                success: true,
                response,
                proyectos_id
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los proyectos.");
    }
};
exports.getProjectGraphs = async (req, res) => {
    try {
        //const { project_id } = req.body;
        const { project_id } = req.query;
        if (!project_id) {
            return res.status(205).json({ error: 'Falta proveer id del proyecto' });
        }

        // Verificar que el proyecto existe
        const project = await Project.findById(project_id);
        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        // 1. Monto recaudado y brecha de financiamiento
        const meta = project.meta;
        const recaudado = project.recaudado;
        const brecha = meta - recaudado;

        // 2. Cantidad recaudada por intervalos (mensual, semanal, diario)
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        const startOfWeek = new Date(startOfDay);
        startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());//1er dia de la semana actual
        const startOfMonth = new Date(startOfDay);
        startOfMonth.setDate(1);//1er dia del mes actual

        const [diario, semanal, mensual] = await Promise.all([
            InvestorProject.aggregate([
                { $match: { projectId: new mongoose.Types.ObjectId(project_id), investmentDate: { $gte: startOfDay } } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
            InvestorProject.aggregate([
                { $match: { projectId: new mongoose.Types.ObjectId(project_id), investmentDate: { $gte: startOfWeek } } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
            InvestorProject.aggregate([
                { $match: { projectId: new mongoose.Types.ObjectId(project_id), investmentDate: { $gte: startOfMonth } } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
        ]);

        // 3. Recaudación/ingresos por mes
        const recaudacionMensual = await InvestorProject.aggregate([
            { $match: { projectId: new mongoose.Types.ObjectId(project_id) } },
            {
                $group: {
                    _id: { year: { $year: '$investmentDate' }, month: { $month: '$investmentDate' } },
                    total: { $sum: '$amount' },
                },
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
        ]);

        // Formatear la respuesta
        res.json({
            montos: { recaudado, brecha, meta },
            intervalos: {
                diario: diario[0]?.total || 0,
                semanal: semanal[0]?.total || 0,
                mensual: mensual[0]?.total || 0,
            },
            recaudacionMensual: recaudacionMensual.map((data) => ({
                year: data._id.year,
                month: data._id.month,
                total: data.total,
            })),
        });
    } catch (error) {
        console.error('Error al obtener gráficos del proyecto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getRiskProfile = async (req, res) => {

    try {
        //const { project_id } = req.body;
        const { project_id } = req.query;
        if (!project_id) {
            return res.status(205).json({ error: 'Falta proveer id del proyecto' });
        }
        const project = await Project.findById(project_id);
        //.populate('inversionistas') -> para mostrar info de ref

        //Project's financial data
        const { nombre, recaudado, meta, inversionistas, estado } = project;
        const porcentajeRecaudado = (recaudado / meta) * 100;
        const inversionistasCount = inversionistas.length;
        const estadoProyecto = estado === 1 ? "Abierto" : estado === 2 ? "En Ejecución" : "Cerrado";

        // Prompt
        const prompt = `
        Genera un perfil de riesgo estructurado para el proyecto:
        {
            "nombreProyecto": "${nombre}",
            "montoRecaudado": ${recaudado},
            "metaDeFinanciamiento": ${meta},
            "porcentajeRecaudado": ${porcentajeRecaudado},
            "cantidadInversionistas": ${inversionistasCount},
            "estadoDelProyecto": "${estadoProyecto}"
        }
        La salida debe estar en el siguiente formato JSON:
        {
            "nivelDeRiesgo": "bajo | medio | alto",
            "estadoDeFinanciamiento": "enCurso | retrasado | totalmenteFinanciado",
            "estadoDeInversionistas": "estable | enCrecimiento | insuficiente",
            "puntajeDeRiesgo": "un valor numérico de 0 a 100"
        }
        Basado en la información proporcionada, calcula el nivel de riesgo del proyecto, el estado de financiamiento y el estado de los inversionistas.
        `;


        //Gemini 
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        console.log("result:", result.response.text());

        // Response
        let riskProfile;
        try {
            // Extraer solo el bloque JSON de la respuesta
            const jsonMatch = result.response.text().match(/```json([\s\S]*?)```/);
            if (!jsonMatch || jsonMatch.length < 2) {
                throw new Error('No se encontró un bloque JSON válido en la respuesta de Gemini');
            }
            const jsonString = jsonMatch[1].trim(); // Bloque JSON limpio
            riskProfile = JSON.parse(jsonString);
        } catch (parseError) {
            console.error('Error parsing JSON from Gemini:', parseError);
            console.error('Response from Gemini:', result.response.text());
            return res.status(500).json({
                success: false,
                message: 'Error parsing JSON from Gemini. Verifica el formato del prompt.',
            });
        }

        //Risk 
        res.status(200).json({
            success: true,
            riskProfile: riskProfile,
        });
    } catch (error) {
        console.error('Error generating risk profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating risk profile',
        });
    }
};



