const express = require('express');
const { addInvestor, addFavorite } = require('../controllers/inversionistaController');
const router = express.Router();

router.post('/agregarInversionita', addInvestor);
router.post('/agregarFavoritos', addFavorite);
//router.post('/Registrarse', register);

module.exports = router;