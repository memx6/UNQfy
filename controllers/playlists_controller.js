const ApiError = require('../Errors/ApiError');
const ResourceAlreadyExists = require('../Errors/ResourceAlreadyExists')
const RelatedResourceNotFound = require('../Errors/RelatedResourceNotFound')
const controller = {}
const utils = require('../utils.js')

controller.getPlaylists = (req,res,next) => {
    //Posibles query parameters:
    let name = req.query.name 
    let durationLT = req.query.durationLT
    let durationGT = req.query.durationGT
    if(thereIsNoParams(name,durationLT,durationGT)){
        next(ApiError.badRequest())
    }
    if (isInvalidDuration(durationLT) || isInvalidDuration(durationGT)){
        next(ApiError.badRequest())
    }
    let unqfy = utils.getUNQfy()
    let playlists = unqfy.filterPlaylists(name,durationLT,durationGT)
    utils.saveUNQfy(unqfy)
    res.status(200).json(playlists)
}
const thereIsNoParams = (p1,p2,p3) =>{
    return (p1 === undefined && p2 === undefined && p3===undefined)
}
const isInvalidDuration = (duration) => {
    return (duration !== undefined && isNaN(parseInt(duration)))
}

controller.getPlaylistById = (req,res,next) => {
    let playlistId = parseInt(req.params.id); 
    let unqfy = utils.getUNQfy();
    let playlist = unqfy.getPlayListById(playlistId);
    if (playlist === undefined){
        next(ApiError.resourceNotFound());
        return;
    }
    res.status(200).json(playlist);
}

controller.deletePlaylist = (req,res,next) => {
    let playlist = parseInt(req.params.id) 

    let unqfy = utils.getUNQfy();
    try{
        unqfy.deletePlayList(playlist)
    }catch(err){
        if (err instanceof RelatedResourceNotFound){
            next(ApiError.resourceNotFound())
            return;
        }
    }
    utils.saveUNQfy(unqfy) // Para que se guarde el estado despeus de agregar
    res.status(204).json()
}

controller.createPlaylist = (req,res,next) => {
    let playlistJson = req.body 
    let unqfy = utils.getUNQfy()
    let playlist;
    if (hasTracks(playlistJson)){
        //Es un post de tracks
        if (isIncorrectJSONForPostingTracks(playlistJson) || hasIncorrectInformationForPostingTracks(playlistJson)){
            next(ApiError.badRequest())
        } else {
            try{
                playlist = unqfy.createPlaylistFromIds(playlistJson.name,playlistJson.tracks.map(trackid => parseInt(trackid)))
            } catch(err){
                if (err instanceof ResourceAlreadyExists){
                    next(ApiError.resourceAlreadyExists())
                }
                if (err instanceof RelatedResourceNotFound){
                    next(ApiError.relatedResourceNotFound())
                }
            }   
        }
    } else { //Es un post con generos{
        if (isIncorrectJSONForPostingWithGenres(playlistJson) || hasIncorrectInformationForPostingWithGenres(playlistJson)){
            next(ApiError.badRequest())
            return;
        }
        try{    
            playlist = unqfy.createPlaylist(playlistJson.name,playlistJson.maxDuration,playlistJson.genres)
        } catch(err){
            if (err instanceof ResourceAlreadyExists){
                next(ApiError.resourceAlreadyExists())
            }
        }
        
    }
    utils.saveUNQfy(unqfy)
    res.status(201).json(playlist)
}

const hasTracks = (playlistJson) => {return playlistJson.tracks !== undefined}

const isIncorrectJSONForPostingWithGenres = (playlistJson) => {
    return (   playlistJson.name === undefined 
            || playlistJson.maxDuration === undefined //Significa que no esta el campo
            || playlistJson.genres === undefined 
            || ((Object.keys(playlistJson).length) !== 3)//Mandaron mas/menos campos de los que deberian
    )
}

const hasIncorrectInformationForPostingWithGenres = (playlistJson) => {
    return (isNaN(parseInt(playlistJson.maxDuration)) || (playlistJson.genres.constructor !== Array))
}

const isIncorrectJSONForPostingTracks = (playlistJson) => {
    return (   playlistJson.name === undefined 
            || playlistJson.tracks === undefined
            || ((Object.keys(playlistJson).length) !== 2)//Mandaron mas/menos campos de los que deberian
    )
}

const hasIncorrectInformationForPostingTracks = (playlistJson) => {
    return ((playlistJson.tracks.constructor !== Array))
}


module.exports = controller