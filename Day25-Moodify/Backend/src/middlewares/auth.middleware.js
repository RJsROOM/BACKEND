//iska kaam h custom middlewares create krna

const blacklistModel = require("../models/blacklist.model");
const userModel= require("../models/user.model");
const redis= require("../config/cache");
const jwt= require("jsonwebtoken");

async function authUser(req, res, next){

    const token= req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized, please login/register first for your token"
        })
    }

    const isTokenBlacklisted= await redis.get(token)

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "User is already logged out"
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


 reids ko middleware me q import kiye?
                qki redis ka istmaal krre h hm taki blacklist k saare read/write operations ko manage kr ske..or qki balcklist ko hm authUser me use krre h islie redis ko uss file me import kie jisme blacklist maintain horha h
 authUser file hme autheniticate krke sirf valid users hi filter krke deta h req.user me store krke.
*/