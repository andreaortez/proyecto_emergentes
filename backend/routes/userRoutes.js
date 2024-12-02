const express = require('express');
const {
    updateUser,
    getUser,
    deleteUser
} = require('../controllers/userController');
const router = express.Router();

//router.post('/Proyecto', createProject);
router.post('/MiPerfil', getUser);
router.put('/User', updateUser);
router.delete('/User', deleteUser);
//router.get('/ProyectosPyme', getProjectsByPyme);
//router.get('/Proyectos', getAllProjects);

module.exports = router;