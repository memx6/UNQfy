class AddAlbumCommand {

    validateInput(argumentos,unqfy){
      if (!unqfy.hasArtistNamed(argumentos[0])){
        throw new Error (`Command was not successful: ${argumentos[0]} is not in the system`)
      }
      if (isNaN(parseInt(argumentos[2]))){
        throw new Error ("Command was not successful: Year is expected to be a number")
      }
    }
    executeCommand(argumentos,unqfy){
      this.validateInput(argumentos,unqfy)
      let albumData = {
        name: argumentos[1],
        year: parseInt(argumentos[2])
       }
      let artist = unqfy.getArtistByName(argumentos[0])
      unqfy.addAlbum(artist.id,albumData)
    }
  }
module.exports = AddAlbumCommand;