class AddUserCommand {
    constructor(){
      this.command = "AddUser";
    }
    
  
    isCommand(commandName){
        return commandName === this.command
    }
  
    executeCommand(argumentos,unqfy){
       
    }
  
  }
module.exports = AddUserCommand;