class GetArtistsMatchingPartialNameCommand {
    /*argumentos[0] = Partial name */
    executeCommand(argumentos,unqfy){
        let artists = unqfy.getArtistsMatchingPartialName(argumentos[0])
        artists.map(artist => artist.printArtist())
    }
}
module.exports = GetArtistsMatchingPartialNameCommand;