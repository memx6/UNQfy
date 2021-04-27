class AddArtistCommand {
    constructor(){
      this.command = "AddArtist";
    }
    
  
    isCommand(commandName){
        return commandName === this.command
    }
  
    executeCommand(argumentos,unqfy){
       let artistData = {
                      name: argumentos[0],
                      country: argumentos[1]
                     }
        let createdArtist = unqfy.addArtist(artistData)
        console.log(`${createdArtist.name} was successfully added`)
    }
  
}

module.exports = AddArtistCommand;