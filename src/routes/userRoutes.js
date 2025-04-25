const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');

router.get('/login', UserController.showLogin);
router.get('/register', UserController.showRegister);
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);

module.exports = router;
