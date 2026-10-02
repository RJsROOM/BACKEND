export async function registerUser(req,res){
    // try{
    //     throw new Error("encountred an error while registering user")
    // }catch(err){
    //     next(err);
    // }

    try{
        const err= new Error("encountred an error while registering user");
    }catch(err){
        err.status= 400; // this is the status code for bad request
        next(err); // this will pass the error to the error handling middleware which we have created in the error.middleware.js file and we have used it in our app.js file.
    }
}