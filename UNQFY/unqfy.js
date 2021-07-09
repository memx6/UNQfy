
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require('./Model/artist');
const Album = require('./Model/album');
const Track = require('./Model/track');
const PlayList = require('./Model/playList');
const User = require('./Model/user');
const ResourceAlreadyExists = require('./Errors/ResourceAlreadyExists');
const RelatedResourceNotFound = require('./Errors/RelatedResourceNotFound')
const musixMatchClient = require('./APIClients/musixmatchClient')
const spotifyClient = require('./APIClients/SpotifyClient')

class UNQfy {
  
  constructor (){
    this.currentId = 1
    this.artists   = {}
    this.playLists = {}
    this.user = []
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
      throw new ResourceAlreadyExists(`An artist named ${artistData.name} already exists.`);
    }
    let artist = new Artist(this.currentId,artistData.name,artistData.country)
    this.artists[this.currentId] = artist
    this.currentId = this.currentId + 1
    return artist
  }

  addUser(userData){
    let emailExists = this.user.some(user => user.email === userData.email)
    if(emailExists){
      throw new ResourceAlreadyExists('Email is already in use')
    }
    let newUser = new User(this.currentId,userData.name,userData.email,userData.password,[])
      this.user.push(newUser)
      this.currentId = this.currentId + 1
      return newUser 
  }

  hasArtistNamed(name){
    let artist = this.getArtistByName(name)
    return artist !== undefined
  }
  hasArtistId(id){
    let artist = this.getArtistById(id)
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
    if(artist === undefined){
      throw new RelatedResourceNotFound(`The id ${artistId} does not belong to an artist`)  
    }
    let newAlbum = new Album(this.currentId,albumData.name,albumData.year)
    artist.addAlbum(this.currentId,newAlbum)
    this.currentId = this.currentId + 1
    return newAlbum 
  }


  hasAlbumNamed(name){
    let album = this.getAlbumByName(name);
    return album !== undefined;
  }

  getAlbumByName(name){
    return this.allAlbums().find(album => album.name === name);
  }
  
  getAlbumByNameAndArtist(artistName, albumName){
    let artist = this.getArtistByName(artistName)
    if (artist === undefined){
      throw new RelatedResourceNotFound(`artist ${artistName} is not in the system`)
    }
    let album = artist.allAlbums().find(album => album.name === albumName)
    if (album === undefined){
      throw new RelatedResourceNotFound(`the album ${albumName} does not belong to the artist ${artistName}`)
    }
    return album;
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

  listenMusic(trackId,userId){
    let track = this.getTrackById(trackId)
    let user = this.getUserById(userId)
    if( track === undefined){
      throw new RelatedResourceNotFound(`The id ${trackId} does not belong to a track`)
    }
    if (user === undefined){
      throw new RelatedResourceNotFound(`The id ${userId} does not belong to an user`)
    }
    user.listenMusicU(track)
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
      if(album === undefined){
        throw new RelatedResourceNotFound(`The id ${albumId} does not belong to an album`)
      } 
      let newTrack = new Track(this.currentId,trackData.name,trackData.duration,trackData.genres);
      album.addTrack(this.currentId,newTrack);
      this.currentId = this.currentId + 1;
      return newTrack;  
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

  getUserById(id){
    return this.user.find(user => user.id === id)
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

  //Print all User by id
  printUser(userID){
    //console.log(this.user)
    let user = this.user.find( u => u.id == userID)
    user.printUser()
   // console.log(this.user.find( u => u.id == userID))
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

  getTracksMatchingPartialName(partialName) {
    return this.allTracks().filter(track => track.name.toLowerCase().includes(partialName.toLowerCase()));
  }
  getAlbumsMatchingPartialName(partialName) {
    return this.allAlbums().filter(album => album.name.toLowerCase().includes(partialName.toLowerCase()));
  }
  getArtistsMatchingPartialName(partialName) {
    return this.allArtists().filter(artist => artist.name.toLowerCase().includes(partialName.toLowerCase()));
  }

  getPlayListsMatchingPartialName(partialName) {
    return this.allPlaylists().filter(playlist => playlist.name.toLowerCase().includes(partialName.toLowerCase()));
  }

  searchByName(name) {
    let dicctionary = {
        artists:   this.getArtistsMatchingPartialName(name),
        albums:    this.getAlbumsMatchingPartialName(name),
        tracks:    this.getTracksMatchingPartialName(name),
        playlists: this.getPlayListsMatchingPartialName(name)
    }
    return dicctionary;
  }

  createUser(id,name,email,pass,list){
  var u =  new User(id,name,email,pass,list)
  this.user.push(u)
  
  }
  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name,maxDuration, genresToInclude) {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */
    if(this.allPlaylists().some(playlist => playlist.name === name)){
      throw new ResourceAlreadyExists(`A playlist named ${name} already exists.`)
    }
      let tracks = this.getTracksMatchingGenres(genresToInclude);
      let newPlayList = PlayList.createPlayList(name,maxDuration, genresToInclude, tracks, this.currentId)
      this.playLists[this.currentId] = newPlayList;
      this.currentId = this.currentId + 1;
      return newPlayList;
  }

  createPlaylistFromIds(name,trackIds){
    if(this.allPlaylists().some(playlist => playlist.name === name)){
      throw new ResourceAlreadyExists(`A playlist named ${name} already exists.`);
    }
    let tracks = trackIds.map(id => this.getTrackById(id))
    if (tracks.some(track => track === undefined)){
      throw new RelatedResourceNotFound("Some trackId given to the playlist does not exist");
    }
    let newPlayList = PlayList.createPlayListFromTracks(name,tracks,this.currentId);
    this.playLists[this.currentId] = newPlayList;
    this.currentId = this.currentId + 1;
    return newPlayList;
  }

  thisIs(artistaID){
   var tranksL =  this.user.map( u => u.listenedTracks).flat()
   var a  =  this.getArtistById(parseInt(artistaID))
    
   var name = a.name
   var alltrackArtist= this.getTracksMatchingArtist(name)
   var listenArtistt= []
   for (var  i = 0 ; i < alltrackArtist.length ; i++){
    listenArtistt.push({track : alltrackArtist[i]
                        , count : tranksL.filter( t => t.name === alltrackArtist[i].name).length})
   }
   listenArtistt.sort((obj1,obj2)=> this.compareCount(obj1,obj2))
  console.log("This is " + name )
  return listenArtistt.slice(0,3).map( obj => obj.track) 
  
}

compareCount(obj1,obj2){
    if(obj1.count > obj2.count){
      return -1
    }
    if (obj1.count < obj2.count){
      return 1 
    }
    return 0
}

 updateArtist(artistId,newArtistData){
  let artist = this.getArtistById(artistId)
  if (artist === undefined){
    throw new RelatedResourceNotFound(`The id ${artistId} does not belong to an artist`) 
  }
  artist.update(newArtistData.name,newArtistData.country)
  return artist
}
updateAlbum(albumId,newYear){
  let album = this.getAlbumById(albumId)
  if (album === undefined){
    throw new RelatedResourceNotFound(`The id ${albumId} does not belong to an album`) 
  }
  let author = this.authorOf(albumId)
  let updatedAlbum = album.update(newYear)
  author.updateAlbum(albumId,updatedAlbum)
  return updatedAlbum
}

  //Delete methods
  deleteArtist(artistId){
    let artist = this.getArtistById(artistId)
    if (artist === undefined){
      throw new RelatedResourceNotFound(`The id ${artistId} does not belong to an artist`) 
    } 
    artist.allAlbums().map(album => this.deleteAlbum(album.id))
    this.artists[artistId] = undefined
  }
  
  deleteAlbum(albumId){
    let album = this.getAlbumById(albumId)
    if (album === undefined){
      throw new RelatedResourceNotFound(`The id ${albumId} does not belong to an album`) 
    }
    let artist = this.authorOf(albumId)
    album.allTracks().map(track => this.deleteTrack(track.id))
    artist.deleteAlbum(albumId)
  }

  deleteTrack(trackId){
    let track = this.getTrackById(trackId)
    if (track === undefined) {
      throw new RelatedResourceNotFound(`The id ${trackId} does not belong to a track`);
    }
    let album = this.albumOf(trackId)
    album.deleteTrack(trackId);
    this.allPlaylists().filter(playlist => playlist.hasTrackWithId(trackId))
                       .map(playlist => playlist.deleteTrack(trackId));
  }

  deletePlayList(playListId){
    let playlist = this.getPlaylistById(playListId)
    if (playlist === undefined) {
      throw new RelatedResourceNotFound(`The id ${playlist} does not belong to a playlist`);
    }
    this.playLists[playListId] = undefined
  }

  deleteUser(userId){
    let user = this.getUserById(userId)
    if (user === undefined) {
      throw new RelatedResourceNotFound(`The id ${userId} does not belong to a user`);
    }
    this.user = this.user.filter(user => user.id !== userId)
  }

  authorOf(albumId){
    return this.allArtists().find(artist => artist.isAuthorOf(albumId))
  }

  albumOf(trackId){
    return this.allAlbums().find(album => album.hasTrack(trackId))
  }

  async getLyrics(trackId){
    let track = this.getTrackById(trackId);
    if (track === undefined) {
      throw new RelatedResourceNotFound(`The id ${trackId} does not belong to a track`);
    }
    if (track.lyrics === ""){
      try {
        let lyrics = await musixMatchClient.getTrackLyrics(track.name);
        track.lyrics = lyrics;
      }catch(err){
        throw new RelatedResourceNotFound("No lyrics available")
      }
    }
    return track;
  }
  /*Precondicion, al menos uno de los 3 parametros debe existir
  durationLT, durationGT son strings que representan un numero.
  Todos los parametros son opcionales, en caso de ser undefined no se usan.
  */
  filterPlaylists(name,durationLT,durationGT){
    let playlists;
    if (name !== undefined){
      playlists = this.getPlayListsMatchingPartialName(name);
    } else {
      playlists = this.allPlaylists();
    }
    if (durationLT !== undefined){
      playlists = playlists.filter(playlist => playlist.duration() < parseInt(durationLT))
    }
    if (durationGT !== undefined){
      playlists = playlists.filter(playlist => playlist.duration() > parseInt(durationGT))
    }
    return playlists
  }

  async populateAlbumsForArtist(artistName){
    let artist = this.getArtistByName(artistName)
    let albums = await spotifyClient.getAlbumsArtistByName(artistName)
    albums.forEach(album => { 
      if(!artist.hasAlbumNamed(album.name)){
        let albumData = { 
        name: album.name, 
        year: parseInt(album.release_date.split("-")[0]) }
        this.addAlbum(artist.id, albumData)
      } 
    });
    return artist.allAlbums()
  }

  getAlbumsForArtist(artistName){
    let artist = this.getArtistByName(artistName);
    if (artist === undefined){
      throw new RelatedResourceNotFound(`There was no artist named ${artistName}`)
    }
    let albumNames = artist.allAlbums().map(album => album.name)
    return albumNames
  }


  

  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy,Artist,Album,Track, PlayList,User];
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
/*
let verPopulatedAlbums = async () => {
  let unqfy = new UNQfy()
  unqfy.addArtist({name: "Michael Jackson", country: "United States"})
  console.log(unqfy.getAlbumsForArtist("Michael Jackson"))
  await unqfy.populateAlbumsForArtist("Michael Jackson")
  console.log(unqfy.getAlbumsForArtist("Michael Jackson"))
}
verPopulatedAlbums()
*/