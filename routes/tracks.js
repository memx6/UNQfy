const express = require('express');
const router = express.Router();
const controller = require('../controllers/tracks_controller')



router.get("/",controller.getTracks)// ESTO ES UN PLACEHOLDER PARA VER SI ANDA, CAMBIAR.

module.exports = router