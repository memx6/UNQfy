class GetTracksMatchingGenres {
    /*argumentos[0] = Gener name*/
    executeCommand(argumentos,unqfy){
        unqfy.getTracksMatchingGenres(argumentos[0])
    }
}
module.exports = GetTracksMatchingGenres;