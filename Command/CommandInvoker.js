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
            let error = new Error('Invalid Command')
            throw error 
        } else {
            return result
        }
    }

    executeCommand(consoleInput,unqfy){
        try {
            let wantedCommand = this.getCommand(consoleInput[0]);
            wantedCommand.executeCommand(consoleInput.slice(1),unqfy)
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = CommandInvoker;