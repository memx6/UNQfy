const controller = {}
const utils = require('../utils.js')

controller.getArtists = (req,res) => {
    res.send("Artistas")
}

module.exports = controller