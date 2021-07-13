const express = require('express');
const router = express.Router();
const controller = require('../controllers/artists_controller');


router.post("/",controller.addArtist);
router.get("/",controller.getArtists);
router.get("/:id",controller.getArtistById);
router.patch("/:id",controller.updateArtist);
router.delete("/:id",controller.deleteArtist);


module.exports = router;