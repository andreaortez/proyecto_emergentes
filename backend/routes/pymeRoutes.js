const express = require('express');
const {getPyme } = require('../controllers/pymeController');
const router = express.Router();

router.get('/Pyme', getPyme);

module.exports = router;