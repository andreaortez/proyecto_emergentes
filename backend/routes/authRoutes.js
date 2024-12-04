const express = require('express');
const { login, register, sendEmail } = require('../controllers/authController');
const router = express.Router();

router.post('/IniciarSesion', login);
router.post('/Registrarse', register);
router.post('/Send', sendEmail);

module.exports = router;
