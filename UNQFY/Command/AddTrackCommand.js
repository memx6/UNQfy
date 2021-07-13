class AddTrackCommand {

  validateInput(argumentos,unqfy){
    if (isNaN(parseInt(argumentos[3]))){
      throw new Error ("Command was not successful: Duration is expected to be a number")
    }
  }
    /*argumentos[0] = ArtistName,
      argumentos[1] = AlbumName,
      argumentos[2] = name of the track,
      argumentos[3] = duration of the track,
      the rest are genres.
      the artist name must correspond to one album from unqfy
      the album name must correspond to one album from unqfy
      Example input: BestHits SmoothCriminal pop.
      Anotacion: Opte por pedirle el nombre del artista porque
      como el nombre de los albumes se puede repetir entre los 
      artistas, de esta forma me aseguro que se lo agrego al 
      artista correcto.*/
    executeCommand(argumentos,unqfy){
      this.validateInput(argumentos,unqfy)
      let trackData = {
        name: argumentos[2],
        duration: parseInt(argumentos[3]),
        genres: argumentos.slice(4)
       }
      let album = unqfy.getAlbumByNameAndArtist(argumentos[0],argumentos[1])
      unqfy.addTrack(album.id,trackData)
    }
  }
module.exports = AddTrackCommand;