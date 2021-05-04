class AddUserCommand {
    /* argumentos[0] = user name
       argumentos[1] = email
       argumentos[2] = password
    */
    executeCommand(argumentos,unqfy){
      let userData = {
          name : argumentos[0],
          email : argumentos[1],
          password : argumentos[2]
        }
        unqfy.addUser(userData)
    }
  }
module.exports = AddUserCommand;