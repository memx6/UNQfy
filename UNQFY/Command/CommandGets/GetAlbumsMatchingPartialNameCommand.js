class GetAlbumsMatchingPartialNameCommand {
    /*argumentos[0] = Partial name */
    executeCommand(argumentos,unqfy){
        let albums = unqfy.getAlbumsMatchingPartialName(argumentos[0])
        albums.map(album => album.printAlbum())
    }
}
module.exports = GetAlbumsMatchingPartialNameCommand;