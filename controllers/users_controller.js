const ResourceAlreadyExists = require('../Errors/ResourceAlreadyExists')
const RelatedResourceNotFound = require('../Errors/RelatedResourceNotFound')
const ApiError = require('../Errors/ApiError');
const controller = {}
const utils = require('../utils.js')


controller.addUser = (req,res,next) => {
    let userJson = req.body
    if(isIncorrectJSONForPosting(userJson)){
        next(ApiError.badRequest());
        return;
    }
    //user data name, email, pass
    let userData = {name: userJson.name, email: userJson.email, password: userJson.password}

    let unqfy = utils.getUNQfy()
    let user;
    try {
        user = unqfy.addUser(userData)
    } catch (err) {
        if (err instanceof ResourceAlreadyExists){
            next(ApiError.resourceAlreadyExists())
            return;
        }
    }
    
    utils.saveUNQfy(unqfy) // Para que se guarde el estado despeus de agregar
    res.status(201).json(user)// Falta el toJson
}



const isIncorrectJSONForPosting = (userJson) => {
    return (   userJson.password === undefined 
            || userJson.name === undefined //Significa que no esta el campo
            || userJson.email === undefined 
            || ((Object.keys(userJson).length) !== 3)//Mandaron mas/menos campos de los que deberian
    )
           
}

controller.listenTrack = (req,res,next) => {
    let trackId = req.query.trackId;
    if (trackId === undefined){
        next(ApiError.badRequest());
        return;
    }
    trackId = parseInt(trackId);
    let userId = parseInt(req.params.id);
    let unqfy = utils.getUNQfy();
    let user;
    try {
        unqfy.listenMusic(trackId,userId);
        user = unqfy.getUserById(userId)
    } catch (err){
        if (err instanceof RelatedResourceNotFound){
            next(ApiError.relatedResourceNotFound())
            return;
        }
    }
    utils.saveUNQfy(unqfy) 
    res.status(200).json(user)// Falta el toJson
}

controller.getUserById = (req,res,next) => {
    let userId = parseInt(req.params.id); 
    let unqfy = utils.getUNQfy();
    let user = unqfy.getUserById(userId);
    if (user === undefined){
        next(ApiError.resourceNotFound());
        return;
    }
    res.status(200).json(user);
}


controller.deleteUser = (req,res,next) => {
    let userId = parseInt(req.params.id) 

    let unqfy = utils.getUNQfy();
    try{
        unqfy.deleteUser(userId)
    }catch(err){
        if (err instanceof RelatedResourceNotFound){
            next(ApiError.resourceNotFound())
            return;
        }
    }
    utils.saveUNQfy(unqfy) // Para que se guarde el estado despeus de agregar
    res.status(204).json()
}

controller.getUsers = (req,res,next) => {
    let unqfy = utils.getUNQfy() 
    let users = unqfy.user
    res.status(200).json(users)
}

module.exports = controller