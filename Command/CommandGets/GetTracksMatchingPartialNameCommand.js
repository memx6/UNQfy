class GetTracksMatchingPartialNameCommand {
    /*argumentos[0] = Partial name */
    executeCommand(argumentos,unqfy){
       let tracks = unqfy.getTracksMatchingPartialName(argumentos[0])
        tracks.map(track => track.printTrack())
    }
}
module.exports = GetTracksMatchingPartialNameCommand;