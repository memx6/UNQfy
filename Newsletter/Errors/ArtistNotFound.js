class ArtistNotFound extends Error {
    constructor (message){
        super(message);
        this.name = "ARTIST_NOT_FOUND"
    }
}

module.exports = ArtistNotFound