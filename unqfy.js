
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require('./Model/artist');
const Album = require('./Model/album');
const Track = require('./Model/track');

class UNQfy {
  
  constructor (){
    this.currentId = 0
    this.artists   = {}
    this.playLists = {}
  }
  

  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData) {
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
    if(this.hasArtistNamed(artistData.name)){
      console.log(`Command was not successful: An artist named ${artistData.name} already exists.`)
    } else {
    let artist = new Artist(this.currentId,artistData.name,artistData.country)
    this.artists[this.currentId] = artist
    this.currentId = this.currentId + 1
    return artist
    }
  }
  hasArtistNamed(name){
    let artist = this.getArtistByName(name)
    return artist !== undefined
  }

  getArtistByName(name){
    return this.allArtists().find(artist => artist.name === name)
  }

  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
    let artist = this.getArtistById(artistId)
    if(artist !== undefined){
      let newAlbum = new Album(this.currentId,albumData.name,albumData.year)
      artist.addAlbum(this.currentId,newAlbum)
      this.currentId = this.currentId + 1
      return newAlbum
    } else {
      console.log(`Command was not successful: The id ${artistId} does not belong to an artist`)
    }
  }


  hasAlbumNamed(name){
    let album = this.getAlbumByName(name);
    return album !== undefined;
  }

  getAlbumByName(name){
    return this.allAlbums().find(album => album.name === name);
  }

  hasTrackNamed(name){
    let track = this.getTrackByName(name);
    return track !== undefined;
  }

  getTrackByName(name){
    return this.allTracks().find(track => track.name === name);
  }

  hasPlayListNamed(name){
    let playList = this.getPlayListByName(name);
    return playList !== undefined;
  }

  getPlayListByName(name){
    return this.allPlaylists().find(playlist => playlist.name === name);
  }

  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId, trackData) {
  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */
      let album = this.getAlbumById(albumId)
      if(album !== undefined){
        let newTrack = new Track(this.currentId,trackData.name,trackData.duration,trackData.genres);
        album.addTrack(this.currentId,newTrack);
        this.currentId = this.currentId + 1;
        return newTrack;
      } else {
        console.log(`Command was not successful: The id ${albumId} does not belong to an album`)
      }
    }


  allArtists(){
    return Object.values(this.artists).filter(artist => artist !== undefined)
  }

  allAlbums(){
    return flatten(this.allArtists().map(artist => artist.allAlbums()))
  }

  allTracks(){
    return flatten(this.allArtists().map(artist => artist.allTracks()))
  }
  allPlaylists(){
    return Object.values(this.playLists).filter(playlist => playlist !== undefined)
  }


  getArtistById(id) {
    return this.allArtists().find(artist => artist.id === id);
  }

  getAlbumById(id) {
    return this.allAlbums().find(album => album.id === id)
  }

  getTrackById(id) {
    return this.allTracks().find(track => track.id === id)
  }

  getPlaylistById(id) {
    return this.allPlaylists().find(playlist => playlist.id === id)
  }

  //Prints all the tracks with the name "name"
  printTrack(name){
    let tracksWithName = this.allTracks().filter(track => track.name === name)
    tracksWithName.map(track => track.printTrack())
  }

  //Prints all the albums with the name "name"
  printAlbum(name){
    let albumsWithName = this.allAlbums().filter(album => album.name === name)
    albumsWithName.map(album => album.printAlbum())
  }

  //Prints the artist with the name "name"
  printArtist(name){
    let artistWithName = this.getArtistByName(name)
    artistWithName.printArtist()
  }

  //Prints all the playLists with the name "name"
  printPlayList(name){
    let playListsWithName = this.allPlaylists().filter(playList => playList.name === name)
    playListsWithName.map(playList => playList.printPlayList())
  }
  




  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genress) {
    return this.allTracks().filter(track => track.genres.some(genre => genress.includes(genre)));
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    return this.getArtistByName(artistName).allTracks();
  }

  getTracksMatchingParcialName(parcialName) {
    return this.allTracks().filter(track => track.name.toLowerCase().includes(parcialName.toLowerCase()));
  }
  getAlbumsMatchingParcialName(parcialName) {
    return this.allAlbums().filter(album => album.name.toLowerCase().includes(parcialName.toLowerCase()));
  }
  getArtistsMatchingParcialName(parcialName) {
    return this.allArtists().filter(artist => artist.name.toLowerCase().includes(parcialName.toLowerCase()));
  }

  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name, genresToInclude, maxDuration) {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */
  }

  //Delete methods
  deleteArtist(artistId){
    let artist = this.getArtistById(artistId)
    if (artist !== undefined){
      artist.allAlbums().map(album => this.deleteAlbum(album.id))
      this.artists[artistId] = undefined
    } else {
      console.log(`Command was not successful: The id ${artistId} does not belong to an artist`)
    }
    
  }
  
  deleteAlbum(albumId){
    let album = this.getAlbumById(albumId)
    if (album !== undefined){
      let artist = this.authorOf(albumId)
      album.allTracks().map(track => this.deleteTrack(track.id))
      artist.deleteAlbum(albumId)
    } else {
      console.log(`Command was not successful: The id ${albumId} does not belong to an album`)
    }
  }

  deleteTrack(trackId){
    let track = this.getTrackById(trackId)
    if (track !== undefined) {
      let album = this.albumOf(trackId)
      album.deleteTrack(trackId)
      this.allPlaylists().filter(playlist => playlist.hasTrack(trackId))
                         .map(playlist => playlist.deleteTrack(trackId))
    } else {
      console.log(`Command was not successful: The id ${trackId} does not belong to a track`)
    }
  }

  deletePlayList(playListId){
    this.playLists[playListId] = undefined
  }

  authorOf(albumId){
    return this.allArtists().find(artist => artist.isAuthorOf(albumId))
  }

  albumOf(trackId){
    return this.allAlbums().find(album => album.hasTrack(trackId))
  }


  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy,Artist,Album,Track];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}
function flatten (array) {
  return array.reduce((acc,curVal) => acc.concat(curVal),[]); //El valor inicial de acc es []
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy: UNQfy,
};

