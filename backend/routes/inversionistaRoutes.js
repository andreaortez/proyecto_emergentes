const express = require('express');
const { declineProposal, addFavorite, makeProposal, acceptProposal, getInversionista } = require('../controllers/inversionistaController');
const router = express.Router();

router.post('/aceptarPropuesta', acceptProposal);
router.post('/rechazarPropuesta', declineProposal);
router.post('/agregarFavoritos', addFavorite);
router.post('/Propuesta', makeProposal);
router.get('/Inversionista', getInversionista)

module.exports = router;