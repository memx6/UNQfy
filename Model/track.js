class Track{
    constructor(id,name,duration,genres){
        this._id = id
        this._name = name 
        this._duration = duration
        this._genres= genres
        this.countListen = 0
        this._lyrics = '' 
    }

    get id(){return this._id}
    get name(){return this._name}
    get duration(){return this._duration}
    get genres(){return this._genres}
    set id(newId){ this._id = newId}
    set name(newName){ this._name = newName}
    set duration(newDuration){ this._duration = newDuration}
    set genres(newGenres) { this._genres = newGenres}
    get countListen(){return this._countListen}
    set countListen(count) { this._countListen = count}
    get lyrics(){return this._lyrics}
    set lyrics(lyrics){this._lyrics = lyrics}

    sumCountListen(){
        this.countListen = this.countListen + 1
    }
    printTrack(){
        let print = 
        `Track: ${this.name}\nID: ${this.id}\nDuration: ${this.duration}\nGenres: ${this.genres}`
        console.log(print)
    }

    toJson() {

        let lyrics = {
            name: this._name,
            lyrics: this.lyrics
        }

        return lyrics
    }
}

module.exports = Track;