const AddArtistCommand = require('./AddArtistCommand')
const AddUserCommand  = require('./AddUserCommand')
const AddAlbumCommand = require('./AddAlbumCommand')
const AddTrackCommand = require('./AddTrackCommand')
const GetMatchingPartial = require('./GetMatchingPartial')
const GetTracksMatchingGenres = require('./GetTracksMatchingGenres')
const GetTracksMatchingArtist = require('./GetTracksMatchingArtist')
const DeleteAlbumCommand = require('./DeleteAlbumCommand')
const DeletePlayListCommand = require('./DeletePlayListCommand')
const DeleteArtistCommand = require('./DeleteArtistCommand')
const DeleteTrackCommand = require('./DeleteTrackCommand')
const PrintArtistCommand = require('./PrintArtistCommand')
const PrintAlbumCommand = require('./PrintAlbumCommand')
const PrintTrackCommand = require('./PrintTrackCommand')
const PrintPlayListCommand = require('./PrintPlayListCommand')
const ListenMusicCommand = require('./ListenMusicCommand')
const CreatePlaylistCommand = require('./CreatePlayListCommand')
const ThisIsCommand = require('./ThisISCommand')


class CommandInvoker {

    constructor(){
        this.commands = {
            AddArtist: new AddArtistCommand(),
            AddAlbum:  new AddAlbumCommand(),
            AddTrack:  new AddTrackCommand(),
            AddUser:   new AddUserCommand(),
            GetMatchingPartial: new GetMatchingPartial(),
            GetTracksMatchingGenres: new GetTracksMatchingGenres(),
            GetTracksMatchingArtist: new GetTracksMatchingArtist(),
            DeleteArtist: new DeleteArtistCommand(),
            DeleteAlbum: new DeleteAlbumCommand(),
            DeleteTrack: new DeleteTrackCommand(),
            DeletePlayList: new DeletePlayListCommand(),
            PrintArtist: new PrintArtistCommand(),
            PrintAlbum: new PrintAlbumCommand(),
            PrintTrack: new PrintTrackCommand(),
            PrintPlayList: new PrintPlayListCommand(),
            ListenMusic : new ListenMusicCommand(),
            CreatePlayList: new CreatePlaylistCommand(),
            ThisIs : new ThisIsCommand()

        }
    }
    getCommand(commandName){
        if (!commandName){
            throw new Error("You must provide a command name")
        }
        let result = this.commands[commandName]
        if (result === undefined){
            let error = new Error(`Command ${commandName} does not exist`)
            throw error 
        } else {
            return result
        }
    }

    executeCommand(consoleInput,unqfy){
        let commandName = consoleInput[0];
        let commandArgs = consoleInput.slice(1);
        try {
            let wantedCommand = this.getCommand(commandName);
            wantedCommand.executeCommand(commandArgs,unqfy);
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = CommandInvoker;