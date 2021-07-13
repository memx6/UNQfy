class NewsletterObserver {
    constructor(){}

    update(event){
        //chequea que evento es y si le interesa,
        if (event.type === "album added") {
            const requestBody = 
                {
                    artistId: event.artistId,
                    subject: `Nuevo Album para artista ${event.artistName}}`, 
                    message: `Se ha agregado el album ${event.albumName} al artista ${event.artistName}`
                };
            console.log(requestBody);
            //llamada a la API de Newsletter en el EP (Post) api/notify
        }
        if (event.type === "artist deleted") {
            const requestBody = {artistId: event.artistId};
            console.log(requestBody);
            //llamada a la API de Newsletter en el EP (Delete) api/subscriptions
        }
    }
}

module.exports =NewsletterObserver;