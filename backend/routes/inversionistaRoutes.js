const express = require('express');
const { declineProposal, addFavorite, makeProposal, acceptProposal, getInversionista, getFavorite, getProposalIList } = require('../controllers/inversionistaController');
const router = express.Router();

router.post('/aceptarPropuesta', acceptProposal);
router.post('/rechazarPropuesta', declineProposal);
router.post('/Propuesta', makeProposal);

router.post('/agregarFavoritos', addFavorite);
router.get('/getFavoritos',getFavorite)

router.get('/Inversionista', getInversionista);
router.get('/PropuestasI', getProposalIList);

module.exports = router;