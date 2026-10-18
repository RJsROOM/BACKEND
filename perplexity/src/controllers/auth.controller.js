import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";


export async function registerController(req,res){
    const {username, email, password}= req.body;

    const isUserExists= await userModel.findOne({
        $or: [{username}, {email}]
    })

    if(isUserExists){
        return res.status(400).json({
            message: "username or email already exists",
            success: false,
            err: "username or email already exists",
        })
    }

    const user= await userModel.create({
        username,
        email,
        password
    })
}