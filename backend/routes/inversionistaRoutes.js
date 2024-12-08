const express = require('express');
const { declineProposal, addFavorite, makeProposal, acceptProposal, getInversionista, getFavorite, getNotificacionesList } = require('../controllers/inversionistaController');
const router = express.Router();

router.post('/Propuesta', makeProposal);

router.post('/agregarFavoritos', addFavorite);
router.get('/getFavoritos', getFavorite)

router.get('/Inversionista', getInversionista);
router.get('/Notificaciones', getNotificacionesList);

module.exports = router;