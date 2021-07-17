const express = require('express');
const router = express.Router();
const controller = require('../controllers/api_monitor_controller')

router.post('/toggle-monitor',controller.isActiveMonitor) 

module.exports = router