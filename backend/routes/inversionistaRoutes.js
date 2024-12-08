const express = require('express');
const { declineProposal, addFavorite, makeProposal, acceptProposal, getInversionista, getFavorite } = require('../controllers/inversionistaController');
const router = express.Router();

router.post('/aceptarPropuesta', acceptProposal);
router.post('/rechazarPropuesta', declineProposal);
router.post('/Propuesta', makeProposal);

router.post('/agregarFavoritos', addFavorite);
router.get('/getFavoritos',getFavorite)

router.get('/Inversionista', getInversionista)

module.exports = router;