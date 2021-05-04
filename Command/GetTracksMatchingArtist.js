class GetTracksMatchingArtist {
    /*argumentos[0] = Artist name*/
    executeCommand(argumentos,unqfy){
        console.log(unqfy.getTracksMatchingArtist(argumentos[0]))
    }
}
module.exports = GetTracksMatchingArtist;