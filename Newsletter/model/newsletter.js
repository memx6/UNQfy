const ArtistNotFound = require('../Errors/ArtistNotFound');


class Newsletter {
//PROBABLEMENTE TODO LO DE ACA DEVUELVA UNA PROMESA
    constructor(){
        this.subscribers = {};
    };

    artistExists(artistId){
     //TODO.    
    }

    isNewArtist(artistId) {
        return this.subscribers[artistId] === undefined
    }
    async subscribe(artistId,email) {
        /*if (!this.artistExists()){
            throw new ArtistNotFound()
        }*/
        //throw new ArtistNotFound
        if (this.isNewArtist(artistId)){
            this.subscribers[artistId] = [email];
        } else { 
            this.subscribers[artistId].push(email);
        }
    }

    async unsubscribe(artistId,email){
       /*if (!this.artistExists()){
            throw new ArtistNotFound()
        }*/
        //Hacer if para que no rompa.
        this.subscribers[artistId] = this.subscribers[artistId].filter(subscribedEmail => subscribedEmail !== email);
    }

    async notify(artistId, subject, message){
        //TODO
    }

    async subscribersOf(artistId) {
        //let artistExists = await this.artistExists();
        /*if (!artistExists){
            throw new ArtistNotFound()
        }*/
        return this.subscribers[artistId] || []
    }

    async deleteSubscribersOf(artistId) {
        /*if (!this.artistExists()){
            throw new ArtistNotFound()
        }*/
        this.subscribers[artistId] = undefined;
    }

}

module.exports = Newsletter;