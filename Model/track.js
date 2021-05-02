class Track{
    constructor(id,name,duration,genres){
        this._id = id
        this._name = name 
        this._duration = duration
        this._genres= genres
        this._count = 0
    }

    get id(){return this._id}
    get name(){return this._name}
    get duration(){return this._duration}
    get genres(){return this._genres}
    set id(newId){ this._id = newId}
    set name(newName){ this._name = newName}
    set duration(newDuration){ this._duration = newDuration}
    set genres(newGenres) { this._genres = newGenres}
    get count(){ return this._count}
    set count(count){ this._count = count}

    printTrack(){
        console.log(this)
    }
}

module.export = Track;