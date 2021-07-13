const express = require('express');
const router = express.Router();
const controller = require('../controllers/api_controller')

router.post("/subscribe",controller.addSubscriber)
router.post("/unsubscribe",controller.removeSubscriber)
router.post("/notify",controller.notify)
router.get("/subscriptions",controller.getSubscriptions)
router.delete("/subscriptions",controller.deleteArtist)

module.exports = router