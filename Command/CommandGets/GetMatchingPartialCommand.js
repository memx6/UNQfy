class GetMatchingPartialCommand {
    /*argumentos[0] = Partial name */
    executeCommand(argumentos,unqfy){
        unqfy.searchByName(argumentos[0])
    }
}
module.exports = GetMatchingPartialCommand;