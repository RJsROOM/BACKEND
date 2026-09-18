//iska kaam h authenitication or auhtorization k lie controller create krna yaani api bnana

const userModel= require("../models/user.model");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const blacklistModel= require("../models/blacklist.model");
const redis= require("../config/cache");


async function registerUser(req,res){
    const {username, email, password}= req.body;

    const isAlreadyRegistered= await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    })

    if(isAlreadyRegistered){
        return res.status(401).json({
            message: "user already registered with email or username"
        })
    }

    const hash= await bcrypt.hash(password, 10);

    const user= await userModel.create({
        username,
        email,
        password: hash
    })

    const token= jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "3d"})

    res.cookie("token", token)

    return res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function loginUser(req,res){
    const {email, password, username}= req.body;

    const user= await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    }).select("+password")  //userschema k andar password false tha to agr usko chiye rhta h to + lgakr likhte h

    if(!user){
        return res.status(400).json({
            message: "Invaid credentials"
        })
    }

    const isPasswordValid= await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invaid credentials"
        })
    }

    const token= jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "3d"});

    res.cookie("token", token);

    return res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function getMe(req,res){
    const user= await userModel.findById(req.user.id);

    res.status(200).json({
        message: "user fetched successfully",
        user
    })
}

async function logoutUser(req,res){

    const token= req.cookies.token;

    res.clearCookie("token"); 

    //this is how we add blacklist in mongo
    // await blacklistModel.create({ 
    //     token
    // })

    //this is how we add blacklist in redis
    await redis.set(token, Date.now().toString(), "EX", 60*60);

    res.status(201).json({
        message: "logout successfull"
    })
}



module.exports= {registerUser, loginUser, getMe, logoutUser}

/*

redis me pehla argument to token diye or dusra argument ko string me q convert kiye?
            as we know ki redis stores values in key-value pairs like javascript stores to jb key-value pairs me store krte h to key to normal name rheta h mgr uska value string me store hota h..or isilie redis me dusra argument string me convert krna rhta h.

jese mongodb k paas mongodb compass hota h jo hme databas eme stores data ko dekhne k kaam aata h wese hi redis k paas bi uska ek application hota h jo hme redis db k andr jo data stored h usko dekhne me kaam aat h or uska naam h REDIS INSIGHT.

*/