const AddArtistCommand = require('./AddArtistCommand')
const AddUserCommand  = require('./AddUserCommand')
const AddAlbumCommand = require('./AddAlbumCommand')
const AddTrackCommand = require('./AddTrackCommand')

class CommandInvoker {

    constructor(){
        this.commands = {
            AddArtist: new AddArtistCommand(),
            AddAlbum:  new AddAlbumCommand(),
            AddTrack:  new AddTrackCommand(),
            AddUser:   new AddUserCommand()
        }
    }
    getCommand(commandName){
        let result = this.commands[commandName]
        if (result === undefined){
            throw Error ("Te confundiste flaco")
        } else {
            return result
        }
    }

    executeCommand(consoleInput,unqfy){
        try {
            let wantedCommand = this.getCommand(consoleInput[0]);
            wantedCommand.executeCommand(consoleInput.slice(1),unqfy)
        } catch (e) {
            console.log("No existe el comando ingresado")
        }
    }
}

module.exports = CommandInvoker;