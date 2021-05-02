class AddTrackCommand {

  validateInput(argumentos,unqfy){
    if (!unqfy.hasAlbumNamed(argumentos[0])){
      throw new Error (`Command was not successful: ${argumentos[0]} is not in the system`)
    }
    if (isNaN(parseInt(argumentos[2]))){
      throw new Error ("Command was not successful: Duration is expected to be a number")
    }
  }
    /*argumentos[0] = AlbumName,
      argumentos[1] = name of the track,
      argumentos[2] = duration of the track,
      the rest are genres.
      the album name must correspond to one album from unqfy
      Example input: BestHits SmoothCriminal pop.*/
    executeCommand(argumentos,unqfy){
      this.validateInput(argumentos,unqfy)
      let trackData = {
        name: argumentos[1],
        duration: parseInt(argumentos[2]),
        genres: argumentos.slice(3)
       }
      let album = unqfy.getAlbumByName(argumentos[0])
      unqfy.addTrack(album.id,trackData)
    }
  }
module.exports = AddTrackCommand;