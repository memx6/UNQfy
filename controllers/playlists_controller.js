const controller = {}
const utils = require('../utils.js')

controller.getPlaylists = (req,res) => {
    res.send("Playlists")
}

module.exports = controller