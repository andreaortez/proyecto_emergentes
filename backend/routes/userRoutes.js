const express = require('express');
const {
    updateUser,
    getUser,
    deleteUser
} = require('../controllers/userController');
const router = express.Router();

//router.post('/Proyecto', createProject);
router.post('/User', getUser);
router.put('/User', updateUser);
router.delete('/User', deleteUser);

module.exports = router;