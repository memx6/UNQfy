class PrintPlayListCommand {

    validateInput(argumentos,unqfy){
      if (!unqfy.hasArtistNamed(argumentos[0])){
        throw new Error (`Command was not successful: ${argumentos[0]} is not in the system`)
      }
    }
    
    /*argumentos[0] = PlayListName,
      the playList name must correspond to one playList from unqfy.
      Example input: BestHits*/
    executeCommand(argumentos,unqfy){
      this.validateInput(argumentos,unqfy)
      let playListName = argumentos[0];
      unqfy.printPlayList(playListName);
    }
  }
module.exports = PrintPlayListCommand;