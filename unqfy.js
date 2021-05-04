
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require('./Model/artist');
const Album = require('./Model/album');
const Track = require('./Model/track');

class UNQfy {
  
  constructor (){
    this.currentId = 0
    this.artists   = {}
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
    let album = this.getAlbumByName(name)
    return album !== undefined
  }

  getAlbumByName(name){
    return this.allAlbums().find(album => album.name === name)
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

  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genress) {
    let tracks = this.allTracks().filter(track => track.genres.some(genre => genress.includes(genre)));
    if (tracks !== undefined ){
      return tracks;
    }else {
      console.log(`Command was not successful: The genres ${genress} does not belong to an track`)
    }

  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    let tracks = this.getArtistByName(artistName).allTracks();
    if (tracks !== undefined ){
      return tracks;
    }else {
      console.log(`Command was not successful: The artist ${artistName} does not belong to an track`)
    }
  }

  getTracksMatchingParcialName(parcialName) {
    let tracks = this.allTracks().filter(track => track.name.toLowerCase().includes(parcialName.toLowerCase()));
    if (tracks.length){
      return tracks;
    } else {
      console.log("No Track were found with the requested partial name")
    }
  }
  getAlbumsMatchingParcialName(parcialName) {
    let albums = this.allAlbums().filter(album => album.name.toLowerCase().includes(parcialName.toLowerCase()));
    if (albums.length){
      return albums;
    } else {
      console.log("No Album were found with the requested partial name")
    }
  }
  getArtistsMatchingParcialName(parcialName) {
    let artists = this.allArtists().filter(artist => artist.name.toLowerCase().includes(parcialName.toLowerCase()));
    if (artists.length){
      return artists;
    } else {
      console.log("No Artist were found with the requested partial name")
    }
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

