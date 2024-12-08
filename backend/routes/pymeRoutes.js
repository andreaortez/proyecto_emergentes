const express = require('express');
const { getPyme, declineProposal, acceptProposal } = require('../controllers/pymeController');
const router = express.Router();

router.get('/Pyme', getPyme);
router.post('/aceptarPropuesta', acceptProposal);
router.post('/rechazarPropuesta', declineProposal);

module.exports = router;