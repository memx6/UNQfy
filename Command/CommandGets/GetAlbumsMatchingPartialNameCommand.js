class GetAlbumsMatchingPartialNameCommand {
    /*argumentos[0] = Partial name */
    executeCommand(argumentos,unqfy){
        unqfy.getAlbumsMatchingPartialName(argumentos[0])
    }
}
module.exports = GetAlbumsMatchingPartialNameCommand;