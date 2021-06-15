const ResourceAlreadyExists = require('../Errors/ResourceAlreadyExists')
const RelatedResourceNotFound = require('../Errors/RelatedResourceNotFound')
const ApiError = require('../Errors/ApiError.js');
const controller = {}
const utils = require('../utils.js')


controller.addArtist = (req,res,next) => {
    let artistJson = req.body
    if(isIncorrectJSONForPosting(artistJson)){
        next(ApiError.badRequest())
        return;
    }
    let unqfy = utils.getUNQfy()
    let artist;
    try{
        artist= unqfy.addArtist(artistJson)
    }catch(err){
        if (err instanceof ResourceAlreadyExists){
            next(ApiError.resourceAlreadyExists())
            return;
        }
    }
    utils.saveUNQfy(unqfy)
    res.status(201).json(artist.toJson())
}

const isIncorrectJSONForPosting = (artistJson) => {
    return (
              artistJson.name === undefined //Significa que no esta el campo
            || artistJson.country === undefined 
            || ((Object.keys(artistJson).length) !== 2)//Mandaron mas/menos campos de los que deberian
    )
           
}

controller.getArtistById = (req,res,next) => {
    let artistId = parseInt(req.params.id);
    let unqfy = utils.getUNQfy();
    let artist = unqfy.getArtistById(artistId);
    if (artist === undefined){
        next(ApiError.resourceNotFound());
        return;
    }
    res.status(200).json(artist.toJson());
}

controller.updateArtist = (req,res,next) => {
    let artistId = parseInt(req.params.id) 
    let artistUpdateJson = req.body
    if(isIncorrectJSONForPosting(artistUpdateJson)){
        next(ApiError.badRequest())
        return;
    }
    let unqfy = utils.getUNQfy();
    let artist;
    try{
        artist= unqfy.updateArtist(artistId,artistUpdateJson)
    }catch(err){
        if (err instanceof RelatedResourceNotFound){
            next(ApiError.resourceNotFound())
            return;
        }
    }
    utils.saveUNQfy(unqfy) 
    res.status(200).json(artist.toJson())

}

controller.deleteArtist = (req,res,next) => {
    let artistId = parseInt(req.params.id) 

    let unqfy = utils.getUNQfy();
    let artist;
    try{
        artist= unqfy.deleteArtist(artistId)
    }catch(err){
        if (err instanceof RelatedResourceNotFound){
            next(ApiError.resourceNotFound())
            return;
        }
    }
    utils.saveUNQfy(unqfy) 
    res.status(204).json()
}

controller.getArtists = (req,res,next) => {
    let artistName = req.query.name 
    let unqfy = utils.getUNQfy() 
    let artists;
    if (artistName === undefined){
        artists = unqfy.allArtists()
    } else {
        artists = unqfy.getArtistsMatchingPartialName(artistName)
    }
    res.status(200).json(artists.map(artist => artist.toJson()))
}
module.exports = controller