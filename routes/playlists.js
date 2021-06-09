const express = require('express');
const router = express.Router();
const controller = require('../controllers/playlists_controller')



router.get("/",controller.getPlaylists)// ESTO ES UN PLACEHOLDER PARA VER SI ANDA, CAMBIAR.
module.exports = router