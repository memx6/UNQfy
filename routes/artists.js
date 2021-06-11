const express = require('express');
const router = express.Router();
const controller = require('../controllers/artists_controller')


router.get("/",controller.getArtists)// ESTO ES UN PLACEHOLDER PARA VER SI ANDA, CAMBIAR.
router.get("/:id",controller.getArtistById)

module.exports = router