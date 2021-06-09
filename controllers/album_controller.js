const controller = {}
const utils = require('../utils.js')

controller.getAlbums = (req,res) => {
    let unqfy = utils.getUNQfy() // EJEMPLO DE USO DEL GET/SAVE DEL UNQFY
    let artists = JSON.stringify(unqfy.artists)
    utils.saveUNQfy(unqfy)
    res.send(artists)
}

module.exports = controller