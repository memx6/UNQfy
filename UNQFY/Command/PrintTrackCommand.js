class PrintTrackCommand {

    validateInput(argumentos,unqfy){
      if (!unqfy.hasTrackNamed(argumentos[0])){
        throw new Error (`Command was not successful: ${argumentos[0]} is not in the system`)
      }
    }
    
    /*argumentos[0] = TrackName,
      the track name must correspond to one album from unqfy.
      Example input: SmoothCriminal*/
    executeCommand(argumentos,unqfy){
      this.validateInput(argumentos,unqfy);
      let trackName = argumentos[0];
      unqfy.printTrack(trackName);
    }
  }
module.exports = PrintTrackCommand;