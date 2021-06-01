class ResourceAlreadyExists extends Error {
    constructor (message){
        super(message);
        this.name = "RESOURCE_ALREADY_EXISTS"
    }
}