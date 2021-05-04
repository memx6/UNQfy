class AddUserCommand {
    constructor(){
      this.command = "AddUser";
    }
    
  
    isCommand(commandName){
        return commandName === this.command
    }
  
    executeCommand(argumentos,unqfy){
      this.validateInput(argumentos,unqfy)
      userData = {
          id : argumentos[0],
           name : argumentos[1],
          email : argumentos[2],
          password : argumentos[3],
        }
        unqfy.addUser(userData)

       
    }
  
  }
module.exports = AddUserCommand;