const ApiError = ('../Errors/ApiError');
const controller = {}
const utils = require('../utils.js')


controller.getLyricsById = (req,res) => {
    let trackId = req.params.id //TODO: Pegarle al UNQFY con el track id y traer las lyrics.
    if (! trackId){ // Esto no es una validacion valida, es un ejemplo de como le pasamos el error al Error Handler.
        next(ApiError.badRequest())
        return;
    }
    res.send()
}


module.exports = controller