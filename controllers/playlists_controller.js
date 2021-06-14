const ApiError = ('../Errors/ApiError');
const controller = {}
const utils = require('../utils.js')

controller.createPlaylist = (req,res) => {
    /*OJO: Aca tenemos pueden llegar de cualquiera de los 2 posts que hay en el visado.
    Tenemos que ver como diferenciar uno del otro y actuar en consecuencia*/
    let playlistJson = req.body //Ver como hacer para crear la playlist de acuerdo a que post es.
    if (! req.body){ // Esto no es una validacion valida, es un ejemplo de como le pasamos el error al Error Handler.
        next(ApiError.badRequest())
        return;
    }
    res.send()
}

controller.getPlaylists = (req,res) => {
    //Posibles query parameters:
    let name = req.query.name 
    let durationLT = req.query.durationLT
    let durationGT = req.query.durationGT
    let unqfy = utils.getUNQfy() // EJEMPLO DE USO DEL GET/SAVE DEL UNQFY
    let artists = JSON.stringify(unqfy.artists)
    utils.saveUNQfy(unqfy)
    res.send(artists)
}

controller.getPlaylistById = (req,res) => {
    let parametros = req.params //TODO: ir a buscar el playlist y retornarlo como dto.
    res.send()
}

controller.deletePlaylist = (req,res) => {
    let playlistId = req.params.id //TODO: borrar el playlist y dar respuesta adecuada.
    res.send()
}


module.exports = controller