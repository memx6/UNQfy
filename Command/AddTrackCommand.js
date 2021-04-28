class AddTrackCommand {
    constructor(){
      this.command = "AddTrack";
    }
    
  
    isCommand(commandName){
        return commandName === this.command
    }
  
    executeCommand(argumentos,unqfy){
       
    }
  
  }
module.exports = AddTrackCommand;