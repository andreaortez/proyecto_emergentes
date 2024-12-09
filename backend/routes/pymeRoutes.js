const express = require('express');
const { getPyme, getMensajesList, acceptProposal, declineProposal, validarPropuesta } = require('../controllers/pymeController');
const router = express.Router();

router.get('/Pyme', getPyme);
router.get('/Mensajes', getMensajesList);

router.post('/aceptarPropuesta', acceptProposal);
router.post('/rechazarPropuesta', declineProposal);
router.get('/validarPropuesta', validarPropuesta);

module.exports = router;