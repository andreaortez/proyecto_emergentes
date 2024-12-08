const express = require('express');
const { getPyme, getMensajesList, acceptProposal, declineProposal } = require('../controllers/pymeController');
const router = express.Router();

router.get('/Pyme', getPyme);
router.get('/Mensajes', getMensajesList);

router.post('/aceptarPropuesta', acceptProposal);
router.post('/rechazarPropuesta', declineProposal);

module.exports = router;