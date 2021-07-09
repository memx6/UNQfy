class GetMatchingPartialCommand {
    /*argumentos[0] = Partial name */
    executeCommand(argumentos,unqfy){
        let matchings = unqfy.searchByName(argumentos[0])
        matchings.artists.map(artist => artist.printArtist())
        matchings.albums.map(album => album.printAlbum())
        matchings.tracks.map(track => track.printTrack())
        matchings.playlists.map(playlist => playlist.printPlayList())
    }
}
module.exports = GetMatchingPartialCommand;