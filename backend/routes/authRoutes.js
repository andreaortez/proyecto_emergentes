const express = require('express');
const { login, register } = require('../controllers/authController');
const router = express.Router();

router.post('/IniciarSesion', login);
router.post('/Registrarse', register);

module.exports = router;
