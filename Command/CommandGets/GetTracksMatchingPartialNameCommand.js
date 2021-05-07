class GetTracksMatchingPartialNameCommand {
    /*argumentos[0] = Partial name */
    executeCommand(argumentos,unqfy){
        unqfy.getTracksMatchingPartialName(argumentos[0])
    }
}
module.exports = GetTracksMatchingPartialNameCommand;