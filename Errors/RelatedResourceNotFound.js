class RelatedResourceNotFound extends Error {
    constructor (message){
        super(message);
        this.name = "RELATED_RESOURCE_NOT_FOUND"
    }
}