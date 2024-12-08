const express = require('express');
const { getPyme, getMensajesList } = require('../controllers/pymeController');
const router = express.Router();

router.get('/Pyme', getPyme);
router.get('/Mensajes', getMensajesList);

module.exports = router;