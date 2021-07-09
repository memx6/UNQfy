class AddArtistCommand {
    /*argumentos[0] = artist name,
      argumentos[1] = country of origin,
      Name of the artist can not be repeated.
      Example input: MichaelJackson UnitedStates*/
    executeCommand(argumentos,unqfy){
       let artistData = {
                      name: argumentos[0],
                      country: argumentos[1]
                     }
        unqfy.addArtist(artistData)
    }
}

module.exports = AddArtistCommand;