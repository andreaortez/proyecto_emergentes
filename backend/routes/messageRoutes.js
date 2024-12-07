const express = require('express');
const { proposalMsg, acceptMsg, declineMsg} = require('../controllers/messageController');
const router = express.Router();

//Mensajes generados en las Propuestas
router.post('/mensajePropuesta',proposalMsg);
router.post('/mensajeAceptada',acceptMsg);
router.post('/mensajeRechazada',declineMsg);

//router.post('/',);

module.exports = router;