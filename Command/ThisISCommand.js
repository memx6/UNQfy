class ThisIsCommand{
    validateInput(argumentos,unqfy){
        if (!unqfy.hasArtistId(argumentos[0])){
          throw new Error (`Command was not successful: ${argumentos[0]} is not in the system`)
        }
        if (isNaN(parseInt(argumentos[2]))){
          throw new Error ("Command was not successful: Year is expected to be a number")
        }
      }
      executeCommand(argumentos,unqfy){
        //this.validateInput(argumentos,unqfy)
        let artisId = parseInt(argumentos[0])
        
        unqfy.thisIs(artisId)
      }
}


module.exports =ThisIsCommand;