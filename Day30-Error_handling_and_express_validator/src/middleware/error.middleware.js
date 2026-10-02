function handleError(err, req, res, next){ // accepts 4 parameters
    res.status(err.status).json({
        message: err.message
    })
}

export default handleError;

/*
    the response code of error like 500, there could be multple types of errors and it all depends on the type of error we are expected to recieve from our controllers.
*/