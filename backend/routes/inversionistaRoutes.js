const express = require('express');
const { addInvestor } = require('../controllers/inversionistaController');
const router = express.Router();

router.post('/agregarInversionita', addInvestor);
//router.post('/Registrarse', register);

module.exports = router;