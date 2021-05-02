class Artist {
    constructor(id,name,country,albums = {}){
        this._id = id;
        this._name = name;
        this._country = country;
        this._albums = albums; 
    }

    get id(){return this._id}
    set id(newId){return this._id = newId}
    get name(){return this._name}
    set name(newName){  return this._name = newName}
    get country(){return this._country}
    set country(newCountry){return this._country = newCountry}
    get albums(){return this._albums}
    set albums(newAlbum){  return this._albums = newAlbum}

    isArtist(name){
        return this.name === name
    }

    allAlbums(){
        return Object.values(this.albums).filter(album => album !== undefined)
    }

    tracks(){
        return flatten(this.albums().map(album => album.tracks()))
    }

    printArtist(){
        let print = 
        `Artist: ${this.name}\nID: ${this.id}\nCountry of origin: ${this.country}\nAlbums: ${this.allAlbums().map(album => album.name)}`
        console.log(print)
    }

    addAlbum(albumId,album){
        this.albums[albumId] = album
    }

}

function flatten (array) {
    return array.reduce((acc,curVal) => acc.concat(curVal),[]); //El valor inicial de acc es []
}

module.exports = Artist;