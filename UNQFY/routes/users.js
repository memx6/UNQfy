const express = require('express');
const router = express.Router();
const controller = require('../controllers/users_controller')

router.post("/",controller.addUser)
router.get("/",controller.getUsers)
router.get("/:id",controller.getUserById)
router.patch("/:id",controller.listenTrack)
router.delete("/:id",controller.deleteUser)

module.exports = router