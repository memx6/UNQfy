const ApiError = require('./ApiError')
function apiErrorHandler(err, req, res, next){
    if (err instanceof ApiError){
        res.status(err.status).json(new ErrorResponse(err));
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