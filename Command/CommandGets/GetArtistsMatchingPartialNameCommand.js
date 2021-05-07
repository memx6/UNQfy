class GetArtistsMatchingPartialNameCommand {
    /*argumentos[0] = Partial name */
    executeCommand(argumentos,unqfy){
        unqfy.getArtistsMatchingPartialName(argumentos[0])
    }
}
module.exports = GetArtistsMatchingPartialNameCommand;