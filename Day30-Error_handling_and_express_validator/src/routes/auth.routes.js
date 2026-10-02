import {Router} from "express";
import { registerUser } from "../controllers/auth.controller.js";

const authRouter= Router();


authRouter.post("/register", registerUser)


export default authRouter;

/*

creating this error handling saves our servers from crashing when an unexpected error occurs and this is simply teh paet of inbuilt-express' error handling.
if e want to handle errrs effectively we want our reponse in json format which is not provided by teh inbuilt-express' error handling. so we will create our own error handling middleware and use it in our app.js file.
*/