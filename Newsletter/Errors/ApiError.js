class ApiError {
    constructor(status, errorCode){
        this.status = status;
        this.errorCode = errorCode;
    }

    //Se pretende que se utilicen los mensajes estaticos en lugar del constructor para
    //crear la clase de error que se necesite.
    static badRequest() {
        return new ApiError(400,"BAD_REQUEST");
    }

    static relatedResourceNotFound() {
        return new ApiError(404,"RELATED_RESOURCE_NOT_FOUND");
    }

    static resourceNotFound() {
        return new ApiError(404,"RESOURCE_NOT_FOUND");
    }

    static internalServerError() {
        return new ApiError(500,"INTERNAL_SERVER_ERROR");
    }

}

module.exports = ApiError;