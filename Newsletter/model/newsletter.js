const ArtistNotFound = require('../Errors/ArtistNotFound');
const UNQFYClient = require('../APIClients/objetito');
const gmailMailClient = require('./sendMail');

class Newsletter {
    constructor(){
        this.subscribers = {};
    };

    isNewArtist(artistId) {
        return this.subscribers[artistId] === undefined
    }
    async subscribe(artistId,email) {
        const artistExists = await UNQFYClient.artistExists(artistId)
        if (!artistExists){
            throw new ArtistNotFound()
        }

        if (this.isNewArtist(artistId)){
            this.subscribers[artistId] = [email];
        } else { 
            this.subscribers[artistId].push(email);
        }
    }

    async unsubscribe(artistId,email){
       const artistExists = await UNQFYClient.artistExists(artistId)
        if (!artistExists){
            throw new ArtistNotFound()
        }

        if(! subscribers[artistId] === undefined){
            this.subscribers[artistId] = this.subscribers[artistId].filter(subscribedEmail => subscribedEmail !== email);
        }
        
    }

    async notify(artistId, subject, message){
        const artistExists = await UNQFYClient.artistExists(artistId)
        if (!artistExists){
            throw new ArtistNotFound()
        }
        const emailMessage = message.split(".")
        const subscribers = this.subscribers[artistId] || [];
        subscribers.forEach(sub => {
            let receiver = {"name": sub, "email": sub}
            gmailMailClient.send_mail(subject,emailMessage,receiver)
        });
    }

    async subscribersOf(artistId) {
        const artistExists = await UNQFYClient.artistExists(artistId)
        if (!artistExists){
            throw new ArtistNotFound()
        }
        return this.subscribers[artistId] || []
    }

    async deleteSubscribersOf(artistId) {
        const artistExists = await UNQFYClient.artistExists(artistId)
        if (!artistExists){
            throw new ArtistNotFound()
        }
        this.subscribers[artistId] = undefined;
    }

}

module.exports = Newsletter;