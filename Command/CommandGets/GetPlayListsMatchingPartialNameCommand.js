class GetPlayListsMatchingPartialNameCommand {
    /*argumentos[0] = Partial name */
    executeCommand(argumentos,unqfy){
        unqfy.getPlayListsMatchingPartialName(argumentos[0])
    }
}
module.exports = GetPlayListsMatchingPartialNameCommand;