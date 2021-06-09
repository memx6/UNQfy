const express = require('express');
const router = express.Router();
const controller = require('../controllers/album_controller')


router.get("/",controller.getAlbums)

module.exports = router