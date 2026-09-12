//iska kaam h authenitication or auhtorization k lie controller create krna yaani api bnana

const userModel= require("../models/user.model");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");


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
    })

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



module.exports= {registerUser, loginUser}