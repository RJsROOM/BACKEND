import express from "express";
import authRouter from "./routes/auth.routes.js";
import handleError from "./middleware/error.middleware.js";


const app= express();

app.use(express.json()); // this is a middleware which will parse the incoming request body and make it available in req.body

app.use("/api/auth", authRouter);


app.use(handleError); // this is the error handling middleware which will catch any error that occurs in the application and send a response to the client. this should be the last middleware in the app.js file.

export default app;