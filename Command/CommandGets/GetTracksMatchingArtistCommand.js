class GetTracksMatchingArtistCommand {
    /*argumentos[0] = Artist name*/
    executeCommand(argumentos,unqfy){
        unqfy.getTracksMatchingArtist(argumentos[0])
    }
}
module.exports = GetTracksMatchingArtistCommand;