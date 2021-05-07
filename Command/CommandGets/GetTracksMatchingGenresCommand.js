class GetTracksMatchingGenresCommand {
    /*argumentos[0] = Gener name*/
    executeCommand(argumentos,unqfy){
        unqfy.getTracksMatchingGenres(argumentos)
    }
}
module.exports = GetTracksMatchingGenresCommand