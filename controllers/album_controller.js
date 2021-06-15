
const ResourceAlreadyExists = require('../Errors/ResourceAlreadyExists')
const RelatedResourceNotFound = require('../Errors/RelatedResourceNotFound')
const ApiError = require('../Errors/ApiError');
const controller = {}
const utils = require('../utils.js')


controller.addAlbum = (req,res,next) => {
    let albumJson = req.body //TODO: Extraer los datos, y efectuar el addArtist de UNQFY.
    if(isIncorrectJSONForPosting(albumJson) || hasIncorrectInformation(albumJson)){
        next(ApiError.badRequest())
        return;
    }
    let artistId = parseInt(albumJson.artistId)
    let albumData = {name: albumJson.name, year: parseInt(albumJson.year)}

    let unqfy = utils.getUNQfy() // EJEMPLO DE USO DEL GET/SAVE DEL UNQFY
    let album;
    try {
        album = unqfy.addAlbum(artistId,albumData)
    } catch (err) {
        if (err instanceof RelatedResourceNotFound){
            next(ApiError.relatedResourceNotFound())
            return;
        }
        if (err instanceof ResourceAlreadyExists){
            next(ApiError.resourceAlreadyExists())
            return;
        }
    }
    
    utils.saveUNQfy(unqfy) // Para que se guarde el estado despeus de agregar
    res.status(201).json(album)
}

const isIncorrectJSONForPosting = (albumJson) => {
    return (   albumJson.artistId === undefined 
            || albumJson.name === undefined //Significa que no esta el campo
            || albumJson.year === undefined 
            || ((Object.keys(albumJson).length) !== 3)//Mandaron mas/menos campos de los que deberian
    )
           
}
const hasIncorrectInformation = (albumJson) => {
    return (isNaN(parseInt(albumJson.artistId)) || isNaN(parseInt(albumJson.year)))
}

controller.getAlbumById = (req,res,next) => {
    let albumId = parseInt(req.params.id); 
    let unqfy = utils.getUNQfy();
    let album = unqfy.getAlbumById(albumId);
    if (album === undefined){
        next(ApiError.resourceNotFound());
        return;
    }
    res.status(200).json(album);
}

controller.updateAlbum = (req,res,next) => {
    let albumId = parseInt(req.params.id) 
    let albumUpdateJson = req.body
    if(isIncorrectJSONForUpdating(albumUpdateJson) || hasIncorrectUpdateInformation(albumUpdateJson)){
        next(ApiError.badRequest())
        return;
    }
    let unqfy = utils.getUNQfy();
    let album;
    try{
        album= unqfy.updateAlbum(albumId,albumUpdateJson.year)
    }catch(err){
        if (err instanceof RelatedResourceNotFound){
            next(ApiError.resourceNotFound())
            return;
        }
    }
    utils.saveUNQfy(unqfy) // Para que se guarde el estado despeus de agregar
    res.status(200).json(album)// FALTA EL TOJSON
}

const isIncorrectJSONForUpdating = (albumUpdateJson) => {return albumUpdateJson.year === undefined}
const hasIncorrectUpdateInformation = (albumUpdateJson) => {return isNaN(parseInt(albumUpdateJson.year))}

controller.deleteAlbum = (req,res,next) => {
    let albumId = parseInt(req.params.id) 

    let unqfy = utils.getUNQfy();
    let album;
    try{
        album= unqfy.deleteAlbum(albumId)
    }catch(err){
        if (err instanceof RelatedResourceNotFound){
            next(ApiError.resourceNotFound())
            return;
        }
    }
    utils.saveUNQfy(unqfy) // Para que se guarde el estado despeus de agregar
    res.status(204).json()
}

controller.getAlbums = (req,res,next) => {
    let albumName = req.query.name //aca tenemos el nombre que viene por query param. Si no existe, por default se retornan todos
    let unqfy = utils.getUNQfy() // EJEMPLO DE USO DEL GET/SAVE DEL UNQFY
    let albums;
    if (albumName === undefined){
        albums = unqfy.allAlbums()
    } else {
        albums = unqfy.getAlbumsMatchingPartialName(albumName)
    }
    //TODO: TRANSFORMAR TODOS LOS albums A JSON.
    res.status(200).json(albums)
}

module.exports = controller