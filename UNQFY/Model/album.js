class Album{
    constructor(id,name,year,tracks = {}){
        this._id = id;
        this._name = name;
        this._year= year;
        this._tracks = tracks;
    }

    get id(){return this._id};
    get name(){return this._name};
    get year(){return this._year };
    get tracks(){return this._tracks};
    set id(newID){this._id = newID};
    set name(newName){this._name = newName};
    set year(newYear){this._year = newYear};
    set tracks(newTracks){this.tracks = newTracks};

    printAlbum(){
        let print = 
        `Album: ${this.name}\nID: ${this.id}\nRelease: ${this.year}\nTracks: ${this.allTracks().map(track => track.name)}\nDuration: ${this.duration()}`;
        console.log(print);
    }

    allTracks(){
        return Object.values(this.tracks).filter(track => track !== undefined);
    }

    duration() {
        return sum(this.allTracks().map(track => track.duration));
    }

    addTrack(trackId,track){
        if(this.hasATrackNamed(track.name)){
            throw new Error (`Command was not successful: A track named ${track.name} already exists in ${this.name}`)
        }
        this.tracks[trackId] = track;
    }
    deleteTrack(trackId){
        this.tracks[trackId] = undefined
    }
    hasTrack(trackId){
        return this.allTracks().some(track => track.id === trackId)
    }
    hasATrackNamed(trackName){
        return this.allTracks().some(track => track.name === trackName)
    }
    update(newYear){
        this.year = newYear;
        return this;
    }

    toJson() {
        let album = {
            id: this._id,
            name: this._name,
            year: this._year,
            tracks: this.allTracks().map(track => track.toJson())
        }
        return album
    }
}

function sum(array) {
    return array.reduce(
            (number, initialValue) => initialValue + number,
            0);
}

module.exports = Album;