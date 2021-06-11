const controller = {}
const utils = require('../utils.js')

controller.getArtists = (req,res) => {
    res.send("Artistas")
}
controller.getArtistById = (req,res) => {
    let parametros = req.params //TODO: IR A BUSCAR EL ARTISTA Y RETORNARLO EN FORMA DE DTO.
    res.send(parametros.id)
}
module.exports = controller