const controller = {}
const utils = require('../utils.js')

//TODO: VER EL MANEJO DE ERRORES.

controller.addAlbum = (req,res) => {
    let artistJson = req.body //TODO: Extraer los datos, y efectuar el addArtist de UNQFY.
    let unqfy = utils.getUNQfy() // EJEMPLO DE USO DEL GET/SAVE DEL UNQFY
    //Agregar el artista a UNQFY
    utils.saveUNQfy(unqfy) // Para que se guarde el estado despeus de agregar
    res.send()
}

controller.getAlbumById = (req,res) => {
    let parametros = req.params //TODO: ir a buscar el album y retornarlo como dto.
    res.send(parametros.id)
}

controller.updateAlbum = (req,res) => {
    let albumId = req.params.id //TODO: actualizar el album y dar respuesta adecuada.
    res.send()
}

controller.deleteAlbum = (req,res) => {
    let albumId = req.params.id //TODO: borrar el album y dar respuesta adecuada.
    res.send()
}

controller.getAlbums = (req,res) => {
    let names = req.query.name //aca tenemos el nombre que viene por query param. Si no existe, por default se retornan todos
    let unqfy = utils.getUNQfy() // EJEMPLO DE USO DEL GET/SAVE DEL UNQFY
    let artists = JSON.stringify(unqfy.artists)
    utils.saveUNQfy(unqfy)
    res.send(artists)
}

module.exports = controller