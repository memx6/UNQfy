class PlayList {
    constructor(id,name,gen,maxDuration, tracks = {}){
        this._id = id;
        this._name = name;
        this._tracks = tracks;
        this._maxDuration = maxDuration; 
        this._gen = gen 
    }

    get id(){return this._id}
    set id(newId){return this._id = newId}
    get name(){return this._name}
    set name(newName){  return this._name = newName}
    get tracks(){return this._tracks}
    set tracks(newtracks){return this._tracks = newtracks}
    get maxDuration(){return this._maxDuration}
    set maxDuration(newmaxDuration){  return this._maxDuration = newmaxDuration}
    get gen(){return this._gen}
    set gen(newGen){this._gen._gen = newGen}

    hasTrack(nameTrack){
        return (this.allTracks().find(track => track.name === nameTrack)) !== undefined
    }
    hasTrackWithId(trackId){
        return (this.allTracks().find(track => track.id === trackId)) !== undefined
    }
    duration(){
        return this.allTracks().map(track => track.duration).reduce((a, b) => a + b, 0)
    }

    allTracks(){
        return Object.values(this.tracks).filter(track => track !== undefined)
    }
 
    printPlayList(){
        let print = 
        `PlayList: ${this._name}\nID: ${this.id}\nTracks: ${this.allTracks().map(track => track._name)}\nGenres: ${this._gen}\nDuration: ${this._maxDuration}`
        console.log(print)
    }

    deleteTrack(trackId){
        this.tracks[trackId] = undefined
    }

    addTracks(tracks){
        tracks.forEach(track => { this._tracks[track.id] = track});
    }

}

module.exports = PlayList;