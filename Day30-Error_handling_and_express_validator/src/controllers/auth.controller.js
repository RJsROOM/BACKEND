export async function registerUser(req,res){
    throw new Error("This is a custom error test");
}


/*
- there s an inbuilt error-handler in the epress and which doen't stops our server form running but it will send the error message to the client and also it will log the error in the console.

- the response form this comes in teh html format but we want our error to be in the json format for this we will create our own custom error handler and we will use it in the app.js file.
*/