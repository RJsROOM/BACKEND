import dotenv from 'dotenv';

dotenv.config();

function handleError(err, req, res, next){ // accepts 4 parameters
    const response ={
        message: err.message,
    }
    if(process.env.NODE_ENVIRONMENT === 'development'){
        response.stack = err.stack;
    }

    res.status(err.status).json(response);
}

export default handleError;

/*
    the response code of error like 500, there could be multple types of errors and it all depends on the type of error we are expected to recieve from our controllers.

    stack tells us where the error occured in our code, it will give us the file name and line number where the error occured. 
    it is only helpful for teh devlopers as it tells us teh  line of code of error.
    and for our site's errors we use environment

*/