class ListenMusicCommand {
    validateInput(argumentos){
        if (isNaN(parseInt(argumentos[0]))){
          throw new Error ("Command was not successful: ID is expected to be a number")
        }
      }

          /*argumentos[0] = ID,
      Example input: 10.*/
    executeCommand(argumentos,unqfy){
        this.validateInput(argumentos)
        let trackId = parseInt(argumentos[0])
        let userId = parseInt(argumentos[1])
        unqfy.listenMusic(trackId,userId)
      }
    }
  module.exports = ListenMusicCommand;