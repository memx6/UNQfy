const rp = require('request-promise');
const NEWSLETTER_PORT = process.env["NEWSLETTER_PORT"] || "http://localhost:5001";

const optionsForNotify = {
    method: 'POST',
    uri: `${NEWSLETTER_PORT}/api/notify`,
    body: {},
    json: true // Automatically stringifies the body to JSON
};
const optionsForDeletion = {
    method: 'DELETE',
    uri: `${NEWSLETTER_PORT}/api/subscriptions`,
    body: {},
    json: true // Automatically stringifies the body to JSON
};
 

class NewsletterObserver {
    constructor(){}

    // information contains an artistId, artistName, and albumName
    notifyAlbumAddition(information){
    const requestBody = 
        {
            artistId: information.artistId,
            subject: `Nuevo Album para artista ${information.artistName}`, 
            message: `Se ha agregado el album ${information.albumName} al artista ${information.artistName}`
        };
    optionsForNotify.body = requestBody;
    rp(optionsForNotify);

    }
// information contains an artistId
    notifyArtistDeletion(information){
        const requestBody = {artistId: information.artistId};
        optionsForDeletion.body = requestBody;
        rp(optionsForDeletion);
    }
}

module.exports =NewsletterObserver;