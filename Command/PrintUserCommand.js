class PrintUserCommand {

    validateInput(argumentos,unqfy){
      if (!unqfy.hasArtistNamed(argumentos[0])){
        throw new Error (`Command was not successful: ${argumentos[0]} is not in the system`)
      }
    }
    
    /*argumentos[0] = ArtistName,
      the artist name must correspond to one artist from unqfy.
      Example input: MichaelJackson*/
    executeCommand(argumentos,unqfy){
      //this.validateInput(argumentos,unqfy)
      let artistName = argumentos[0];
      unqfy.printUser(artistName);
    }
  }
module.exports = PrintUserCommand;