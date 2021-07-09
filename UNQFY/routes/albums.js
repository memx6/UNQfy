const express = require('express');
const router = express.Router();
const controller = require('../controllers/album_controller')

router.post("/",controller.addAlbum)
router.get("/",controller.getAlbums)
router.get("/:id",controller.getAlbumById)
router.patch("/:id",controller.updateAlbum)
router.delete("/:id",controller.deleteAlbum)

module.exports = router