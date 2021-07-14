//Este es el observer que va a tener el UNQFY.
class DependencyTransformer {
    constructor(listener){
        this.listener = listener;
    }
    update(aspect,event){
        if (aspect === "artist deleted"){
            this.listener.notifyArtistDeletion(event);
        }
        if (aspect === "album added"){
            this.listener.notifyAlbumAddition(event);
        }
    }
}

module.exports = DependencyTransformer;