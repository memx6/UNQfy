class PrintAlbumCommand {

    validateInput(argumentos,unqfy){
      if (!unqfy.hasAlbumNamed(argumentos[0])){
        throw new Error (`Command was not successful: ${argumentos[0]} is not in the system`)
      }
    }
    
    /*argumentos[0] = AlbumName,
      the album name must correspond to one album from unqfy.
      Example input: GreatestHits*/
    executeCommand(argumentos,unqfy){
      this.validateInput(argumentos,unqfy);
      let albumName = argumentos[0];
      unqfy.printAlbum(albumName);
    }
  }
module.exports = PrintAlbumCommand;