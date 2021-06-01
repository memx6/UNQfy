class BadRequest extends Error {
    constructor (message){
        super(message);
        this.name = "BAD_REQUEST"
    }
}