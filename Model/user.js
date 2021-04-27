class User {
    constructor(id,name,email,password,listenedTracks){
        this._id = id;
        this._name = name;
        this._email = email
        this._password = password
        this._listenedTracks = listenedTracks
    }

    get id(){return this._id}
    get name(){return this.name}
    get email(){return this._email}
    get password(){return this._password}
    get listenedTracks(){return this._listenedTracks}
    set id(newid){this._id = newid}
    set name(newName){this._name = newName}
    set email(newEmail){this._name = newEmail}
    set password(newPassword){this._password = newPassword}
    set listenedTracks(newList){this._listenedTracks = newList}

    listen(track){
        this.listenedTracks.push(track)
    }
    timesListenTrack(track){
        return this.listenedTracks.filter( t => t.name == track.name).map(t => t.duration).reduce((a, b) => a + b, 0)
    }
    printUser(){
        console.log(this)
    }
}

module.export = {
    User : User,
}