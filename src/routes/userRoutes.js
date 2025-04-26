const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');
const checkAuth = require('../middlewares/checkAuth.js');

// User Auth
router.get('/login', UserController.showLogin);
router.get('/register', UserController.showRegister);
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);

// User Dashboard and logout.
router.get('/dashboard', checkAuth, UserController.showDashboard);
router.get('/logout', UserController.logoutUser);

module.exports = router;
