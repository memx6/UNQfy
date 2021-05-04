class GetTracksMatchingGenres {
    /*argumentos[0] = Gener name*/
    executeCommand(argumentos,unqfy){
        console.log(unqfy.getTracksMatchingGenres(argumentos[0]))
    }
}
module.exports = GetTracksMatchingGenres;