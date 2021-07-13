const express = require('express');
const router = express.Router();
const controller = require('../controllers/playlists_controller')


router.post("/",controller.createPlaylist)
router.get("/:id",controller.getPlaylistById)
router.delete("/:id",controller.deletePlaylist)
router.get("/",controller.getPlaylists)

module.exports = router