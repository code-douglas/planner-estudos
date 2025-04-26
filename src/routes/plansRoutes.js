const express = require('express');
const router = express.Router();
const PlanController = require('../controllers/PlanController.js');
const checkAuth = require('../middlewares/checkAuth.js');

router.get('/plans/create', checkAuth, PlanController.showCreateForm);
router.post('/plans/create', checkAuth, PlanController.createPlan);

module.exports = router;
