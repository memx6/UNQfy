const AddArtistCommand = require('./AddArtistCommand')

class CommandInvoker {
  
    executeCommand(consoleInput,unqfy){
        let artistCommand = new AddArtistCommand()
        let allKnownCommands = [artistCommand]
        let wantedCommand = allKnownCommands.find(command => command.isCommand(consoleInput[0]));
        wantedCommand.executeCommand(consoleInput.slice(1),unqfy)
    }
  }
module.exports = CommandInvoker;