const controller = {}
const utils = require('../utils.js')


controller.getLyricsById = (req,res) => {
    let trackId = req.params.id //TODO: Pegarle al UNQFY con el track id y traer las lyrics.
    res.send()
}


module.exports = controller