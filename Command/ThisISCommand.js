class ThisIsCommand{
    validateInput(argumentos,unqfy){
        if (!unqfy.hasArtistId(parseInt(argumentos[0]))){
          throw new Error (`Command was not successful: the ID ${argumentos[0]} does not belong to an artist`)
      }
    }
      executeCommand(argumentos,unqfy){
        this.validateInput(argumentos,unqfy)
        let artisId = parseInt(argumentos[0])
        
        let top = unqfy.thisIs(artisId)
        top.map(t => t.printTrack())
      }
}


module.exports =ThisIsCommand;