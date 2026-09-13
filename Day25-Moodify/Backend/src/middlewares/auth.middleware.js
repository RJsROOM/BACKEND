//iska kaam h custom middlewares create krna

const userModel= require("../models/user.model");
const jwt= require("jsonwebtoken");

async function authUser(req, res, next){

    const token= req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized, please login/register first for your token"
        })
    }

    try{
        const decoded= jwt.verify(
            token, 
            process.env.JWT_SECRET
        )

        req.user= decoded;

        next();
    }catch(err){
        return res.status(401).json({
            message: "token expired, please login/register again for your token"
        })
    }
}


module.exports= {authUser}


/*
 at line 17, the jwt.verify will throw an error if the token is expired and for that error only we use try-catch block to recieve the error.
*/