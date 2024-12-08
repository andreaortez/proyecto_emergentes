const express = require('express');
const { addFavorite, makeProposal, getInversionista, getFavorite } = require('../controllers/inversionistaController');
const router = express.Router();

router.post('/Propuesta', makeProposal);

router.post('/agregarFavoritos', addFavorite);
router.get('/getFavoritos', getFavorite)

router.get('/Inversionista', getInversionista)

module.exports = router;