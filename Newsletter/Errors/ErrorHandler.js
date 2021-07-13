const ApiError = require('./ApiError')
//ADECUAR A NEWSLETTER

function apiErrorHandler(err, req, res, next){
    if (err instanceof ApiError){
        res.status(err.status).json(new ErrorResponse(err));
        return;
    }
    if (err instanceof SyntaxError){
        let error = ApiError.badRequest()
        res.status(error.status).json(new ErrorResponse(error))
        return;
    }
    res.status(500).json({status: 500,
                          errorCode: "INTERNAL_SERVER_ERROR"})
}

class ErrorResponse {
    constructor (apiError){
        this.status = apiError.status;
        this.errorCode = apiError.errorCode;
    }
}

module.exports = apiErrorHandler;