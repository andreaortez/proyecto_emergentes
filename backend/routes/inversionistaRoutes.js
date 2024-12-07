const express = require('express');
const { declineProposal, addFavorite, makeProposal, acceptProposal } = require('../controllers/inversionistaController');
const router = express.Router();

router.post('/aceptarPropuesta', acceptProposal);
router.post('/rechazarPropuesta', declineProposal);
router.post('/agregarFavoritos', addFavorite);
router.post('/Propuesta', makeProposal);

module.exports = router;