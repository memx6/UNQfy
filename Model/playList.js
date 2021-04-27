class PlayList {
    constructor(id,name,tracks,maxDuration){
        this._id = id;
        this._name = name;
        this._tracks = tracks;
        this._maxDuration = maxDuration; 
    }

    get id(){return this._id}
    set id(newId){return this._id = newId}
    get name(){return this._name}
    set name(newName){  return this._name = newName}
    get tracks(){return this._tracks}
    set tracks(newtracks){return this._tracks = newtracks}
    get albums(){return this._albums}
    set albums(newmaxDuration){  return this._maxDuration = newmaxDuration}

    hasTrack(nameTrack){
        return this.tracks.find(track => track.name === nameTrack)
    }
    duration(){
        return this.tracks.map(track => track.duration).reduce((a, b) => a + b, 0)
    }
 
    printPlayList(){
        console.log(this)
    }
}

module.exports = PlayList;