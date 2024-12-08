const express = require('express');
const { getPyme, getProposalPList } = require('../controllers/pymeController');
const router = express.Router();

router.get('/Pyme', getPyme);
router.get('/PropuestasP', getProposalPList);

module.exports = router;