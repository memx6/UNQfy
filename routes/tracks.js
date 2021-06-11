const express = require('express');
const router = express.Router();
const controller = require('../controllers/tracks_controller')



router.get("/:id/lyrics",controller.getLyricsById)

module.exports = router