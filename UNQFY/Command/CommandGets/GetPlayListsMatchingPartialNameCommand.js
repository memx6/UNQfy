class GetPlayListsMatchingPartialNameCommand {
    /*argumentos[0] = Partial name */
    executeCommand(argumentos,unqfy){
        let playLists = unqfy.getPlayListsMatchingPartialName(argumentos[0])
        playLists.map(playList => playList.printPlayList())
    }
}
module.exports = GetPlayListsMatchingPartialNameCommand;