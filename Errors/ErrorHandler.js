const ApiError = require('./ApiError')
function apiErrorHandler(err, req, res, next){
    if (err instanceof ApiError){
        res.status(err.status).json(err);
        return;
    }
    res.status(500).json({status: 500,
                          errorCode: "INTERNAL_SERVER_ERROR"})
}

module.exports = apiErrorHandler;