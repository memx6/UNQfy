class AddArtistCommand {
  
    executeCommand(argumentos,unqfy){
       let artistData = {
                      name: argumentos[0],
                      country: argumentos[1]
                     }
        unqfy.addArtist(artistData)
    }
}

module.exports = AddArtistCommand;