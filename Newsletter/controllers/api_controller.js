const ApiError = require('../Errors/ApiError');
const controller = {}
const utils = require('../utils.js')
const ArtistNotFound = require('../Errors/ArtistNotFound')


controller.addSubscriber = (req,res,next) => {
    let subscriptionJson = req.body;
    
    if(isIncorrectJSONForSubscribing(subscriptionJson) || hasIncorrectInformation(subscriptionJson)){
        next(ApiError.badRequest());
        return;
    };
    let artistId = parseInt(subscriptionJson.artistId);
    let email = subscriptionJson.email;

    let newsletter = utils.getNewsletter(); //No deberia guardarse no? porque es siempre la misma instancia. Cuando muere el node muere.
    console.log(newsletter);
    newsletter.subscribe(artistId,email) //AL ESTO DEVOLVER UNA PROMESA PORQUE HAY QUE IR A BUSCAR INFO A OTRO LADO, CREO QUE SE MANEJA ASI.
    .then(() => {
        res.status(200).json()
    })//ESTO ESTA BIEN???
    .catch( (err) => next (
        (err instanceof ArtistNotFound)? ApiError.relatedResourceNotFound() : err
    ))
};

controller.removeSubscriber = (req,res,next) => {
    let unSubscriptionJson = req.body;
    if(isIncorrectJSONForSubscribing(unSubscriptionJson) || hasIncorrectInformation(unSubscriptionJson)){
        next(ApiError.badRequest());
        return;
    };
    let artistId = parseInt(unSubscriptionJson.artistId);
    let email = unSubscriptionJson.email;

    let newsletter = utils.getNewsletter(); //No deberia guardarse no? porque es siempre la misma instancia. Cuando muere el node muere.

    newsletter.unsubscribe(artistId,email) //AL ESTO DEVOLVER UNA PROMESA PORQUE HAY QUE IR A BUSCAR INFO A OTRO LADO, CREO QUE SE MANEJA ASI.
    .then(() => {
        res.status(200).json();
    })
    .catch( (err) => next (
        (err instanceof ArtistNotFound)? ApiError.relatedResourceNotFound() : err
    ));
};

controller.notify = (req,res,next) => {
    let notification = req.body;
    if(isIncorrectJSONForNotification(notification) || hasIncorrectInformation(notification)){
        next(ApiError.badRequest());
        return;
    };
    let artistId = parseInt(notification.artistId);
    let subject = notifcation.subject;
    let message = notifcation.message;

    let newsletter = utils.getNewsletter();

    newsletter.notify(artistId,subject,message) //AL ESTO DEVOLVER UNA PROMESA PORQUE HAY QUE IR A BUSCAR INFO A OTRO LADO, CREO QUE SE MANEJA ASI.
    .then(() => {
        res.status(200).json()
    })//ESTO ESTA BIEN???
    .catch( (err) => next (
        (err instanceof ArtistNotFound)? ApiError.relatedResourceNotFound() : err
    ))
}

const isIncorrectJSONForNotification = (notification) => {
    return (   notification.artistId === undefined 
        ||     notification.subject === undefined //Significa que no esta el campo
        ||     notification.message === undefined  
        ||     ((Object.keys(notification).length) !== 3)//Mandaron mas/menos campos de los que deberian
    )      
}



controller.getSubscriptions = (req,res,next) => {
    let artistId = req.query.artistId;
    if (artistId === undefined) {
        next(ApiError.badRequest());
        return;
    }
    let parsedArtistId = parseInt(artistId);
    newsletter = utils.getNewsletter();

    newsletter.subscribersOf(parsedArtistId)
     .then((emails) => res.status(200).json({artistId: parsedArtistId, subscriptors: emails}))
     .catch( (err) => next (
        (err instanceof ArtistNotFound)? ApiError.relatedResourceNotFound() : err
    ));
}

controller.deleteArtist = (req,res,next) => {
    let deleteJson = req.body;
    if(isIncorrectJSONForDeleting(deleteJson) || hasIncorrectInformation(deleteJson)){
        next(ApiError.badRequest());
        return;
    };
    let artistId = parseInt(deleteJson.artistId);

    let newsletter = utils.getNewsletter(); //No deberia guardarse no? porque es siempre la misma instancia. Cuando muere el node muere.

    newsletter.deleteSubscribersOf(artistId) //AL ESTO DEVOLVER UNA PROMESA PORQUE HAY QUE IR A BUSCAR INFO A OTRO LADO, CREO QUE SE MANEJA ASI.
    .then(() => {
        res.status(200).json()
    })//ESTO ESTA BIEN???
    .catch( (err) => next (
        (err instanceof ArtistNotFound)? ApiError.relatedResourceNotFound() : err
    ))
}

const isIncorrectJSONForSubscribing = (subscriptionJson) => {
    return (   subscriptionJson.artistId === undefined 
            || subscriptionJson.email === undefined //Significa que no esta el campo 
            || ((Object.keys(subscriptionJson).length) !== 2)//Mandaron mas/menos campos de los que deberian
    )         
}

const hasIncorrectInformation = (subscriptionJson) => {
    return (isNaN(parseInt(subscriptionJson.artistId)))
}

const isIncorrectJSONForDeleting = (deleteJson) =>{
    return (   deleteJson.artistId === undefined 
        || ((Object.keys(deleteJson).length) !== 1)
    )   
}

module.exports = controller
