const express = require('express');
const router = express.Router();
const controller = require('../controllers/playlists_controller')


router.post("/",controller.createPlaylist)
router.get("/",controller.getPlaylistById)
router.delete("/",controller.deletePlaylist)
router.get("/",controller.getPlaylists)

module.exports = router