class GetMatchingPartial {
    /*argumentos[0] =  */
    executeCommand(argumentos,unqfy){
        console.log(unqfy.getTracksMatchingParcialName(argumentos[0]))
        console.log(unqfy.getAlbumsMatchingParcialName(argumentos[0]))
        console.log(unqfy.getArtistsMatchingParcialName(argumentos[0]))
    }
}
module.exports = GetMatchingPartial;