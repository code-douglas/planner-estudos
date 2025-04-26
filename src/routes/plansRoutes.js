const express = require('express');
const router = express.Router();
const PlanController = require('../controllers/PlanController.js');
const checkAuth = require('../middlewares/checkAuth.js');

router.get('/plans/create', checkAuth, PlanController.showCreateForm);
router.post('/plans/create', checkAuth, PlanController.createPlan);
router.get('/plans/edit/:id', checkAuth, PlanController.getDataPlanForEdit);
router.post('/plans/update/:id', checkAuth, PlanController.updatePlan);
router.post('/plans/delete/:id', PlanController.deletePlan);

module.exports = router;
