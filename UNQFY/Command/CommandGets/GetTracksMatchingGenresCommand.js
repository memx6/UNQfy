class GetTracksMatchingGenresCommand {
    /*argumentos[0] = Gener name*/
    executeCommand(argumentos,unqfy){
       let tracksGens = unqfy.getTracksMatchingGenres(argumentos)
        tracksGens.map(track => track.printTrack())
    }
}
module.exports = GetTracksMatchingGenresCommand