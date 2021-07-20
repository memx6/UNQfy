const express = require('express');
const router = express.Router();
const controller = require('../controllers/api_monitor_controller')

router.post('/toggle-monitor',controller.isActiveMonitor)
router.get('/services-status',controller.servicesStatus) 

module.exports = router