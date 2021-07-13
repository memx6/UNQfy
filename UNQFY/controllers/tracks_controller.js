const ApiError = require('../Errors/ApiError');
const RelatedResourceNotFound = require('../Errors/RelatedResourceNotFound');
const controller = {}
const utils = require('../utils.js')


controller.getLyricsById = async (req,res,next) => {
    let trackId = parseInt(req.params.id) //TODO: Pegarle al UNQFY con el track id y traer las lyrics.
    let unqfy = utils.getUNQfy() // EJEMPLO DE USO DEL GET/SAVE DEL UNQFY
    let track;
    try {
        track = await unqfy.getLyrics(trackId)
    } catch(err) {
        if (err instanceof RelatedResourceNotFound){
            next(ApiError.resourceNotFound())
            return;
        }
    }
    res.status(200).json(track.toJson())
}

module.exports = controller