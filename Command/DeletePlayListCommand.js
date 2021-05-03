class DeletePlayListCommand {

    validateInput(argumentos){
      if (isNaN(parseInt(argumentos[0]))){
        throw new Error ("Command was not successful: ID is expected to be a number")
      }
    }
    
    /*argumentos[0] = ID,
      Example input: 10.*/
    executeCommand(argumentos,unqfy){
      this.validateInput(argumentos)
      let playListId = parseInt(argumentos[0])
      unqfy.deletePlayList(playListId)
    }
  }
module.exports = DeletePlayListCommand;