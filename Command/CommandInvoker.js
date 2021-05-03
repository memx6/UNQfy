const AddArtistCommand = require('./AddArtistCommand')
const AddUserCommand  = require('./AddUserCommand')
const AddAlbumCommand = require('./AddAlbumCommand')
const AddTrackCommand = require('./AddTrackCommand')
const DeleteAlbumCommand = require('./DeleteAlbumCommand')
const DeletePlayListCommand = require('./DeletePlayListCommand')
const DeleteArtistCommand = require('./DeleteArtistCommand')
const DeleteTrackCommand = require('./DeleteTrackCommand')


class CommandInvoker {

    constructor(){
        this.commands = {
            AddArtist: new AddArtistCommand(),
            AddAlbum:  new AddAlbumCommand(),
            AddTrack:  new AddTrackCommand(),
            AddUser:   new AddUserCommand(),
            DeleteArtist: new DeleteArtistCommand(),
            DeleteAlbum: new DeleteAlbumCommand(),
            DeleteTrack: new DeleteTrackCommand(),
            DeletePlayList: new DeletePlayListCommand()
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