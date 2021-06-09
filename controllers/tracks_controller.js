const controller = {}
const utils = require('../utils.js')

controller.getTracks = (req,res) => {
    res.send("Tracks")
}

module.exports = controller