class GetTracksMatchingArtistCommand {
    /*argumentos[0] = Artist name*/
    executeCommand(argumentos,unqfy){
        let tracksArts = unqfy.getTracksMatchingArtist(argumentos[0])
        tracksArts.map(track => track.printTrack())
    }
}
module.exports = GetTracksMatchingArtistCommand;