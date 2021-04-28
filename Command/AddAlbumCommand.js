class AddAlbumCommand {
    constructor(){
      this.command = "AddAlbum";
    }
    
  
    isCommand(commandName){
        return commandName === this.command
    }
  
    executeCommand(argumentos,unqfy){
       
    }
  
  }
module.exports = AddAlbumCommand;