const rp = require('request-promise');
const NEWSLETTER_PORT = process.env["NEWSLETTER-PORT"] || 3001;

const optionsForNotify = {
    method: 'POST',
    uri: `http://localhost:${NEWSLETTER_PORT}/api/notify`,
    body: {},
    json: true // Automatically stringifies the body to JSON
};
const optionsForDeletion = {
    method: 'DELETE',
    uri: `http://localhost:${NEWSLETTER_PORT}/api/subscriptions`,
    body: {},
    json: true // Automatically stringifies the body to JSON
};
 


const NewsletterObserver = {}

const notifyAlbumAddition = (information) => {
    const requestBody = 
        {
            artistId: information.artistId,
            subject: `Nuevo Album para artista ${information.artistName}}`, 
            message: `Se ha agregado el album ${information.albumName} al artista ${information.artistName}`
        };
    optionsForNotify.body = requestBody;
    rp(optionsForNotify);
    //llamada a la API de Newsletter en el EP (Post) api/notify
};
const notifyArtistDeletion = (information) => {
    console.log("mande solicitud de borrado");
    const requestBody = {artistId: information.artistId};
    optionsForDeletion.body = requestBody;
    rp(optionsForDeletion);
    //llamada a la API de Newsletter en el EP (Delete) api/subscriptions
};

NewsletterObserver.notifyAlbumAddition = notifyAlbumAddition;
NewsletterObserver.notifyArtistDeletion = notifyArtistDeletion;


module.exports =NewsletterObserver;
/*

class NewsletterEventManager {
    constructor(newsletterObserver){
        this.listener = newsletterObserver;
    }
    update(aspect,event){
        if (aspect === "album added"){
            this.listener.notifyAlbumAddition(event);
        }
        if (aspect === "artist deleted"){
            this.listener.notifyArtistDeletion(event);
        }
    }
}
*/

/*
class NewsletterObserver {
    constructor(){}
    // information contains an artistId, artistName, and albumName
    notifyAlbumAddition(information){
    const requestBody = 
        {
            artistId: information.artistId,
            subject: `Nuevo Album para artista ${information.artistName}}`, 
            message: `Se ha agregado el album ${information.albumName} al artista ${information.artistName}`
        };
    optionsForNotify.body = requestBody;
    rp(optionsForNotify);
    //llamada a la API de Newsletter en el EP (Post) api/notify
    }
// information contains an artistId
    notifyArtistDeletion(information){
        console.log("mande solicitud de borrado");
        const requestBody = {artistId: information.artistId};
        optionsForDeletion.body = requestBody;
        rp(optionsForDeletion);
        //llamada a la API de Newsletter en el EP (Delete) api/subscriptions
    }
}
*/