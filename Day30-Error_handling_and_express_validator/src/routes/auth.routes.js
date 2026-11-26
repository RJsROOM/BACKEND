import {registerUser} from "../controllers/auth.controller.js";
import {Router} from "express";


const authRouter= Router();

/*
    /api/auth/register
    method: POST
*/
authRouter.post("/register", registerUser);


export default authRouter;