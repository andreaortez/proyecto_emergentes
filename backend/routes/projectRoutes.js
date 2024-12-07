const express = require('express');
const {
    createProject,
    getProject,
    updateProject,
    deleteProject,
    getProjectsByPyme,
    getAllProjects,
    getProjectGraphs,
    getRiskProfile,
    getProjectsListPyme,
    getProjectsByInvestor
} = require('../controllers/projectController');
const router = express.Router();

router.post('/Proyecto', createProject);
router.get('/Proyecto', getProject);
router.put('/Proyecto', updateProject);
router.delete('/Proyecto', deleteProject);
router.get('/ProyectosPyme', getProjectsByPyme);
router.get('/Proyectos', getAllProjects);
router.get('/Graphs', getProjectGraphs);
router.get('/PerfilRiesgo', getRiskProfile);

router.get('/ListarProyectos', getProjectsListPyme);
router.get('/ProyectosInversionista', getProjectsByInvestor)

module.exports = router;
