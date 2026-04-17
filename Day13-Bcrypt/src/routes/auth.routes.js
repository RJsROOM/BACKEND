//iska kaam: authentication related APIs ka code rkhna

const express= require('express');
const userModel= require('../models/user.model')
const jwt= require('jsonwebtoken')
const crypto= require('crypto')

const authRouter= express.Router();

authRouter.post('/register',async (req,res)=>{
    const {name,email,password}= req.body;

    const isUserAlreadyExists= await userModel.findOne({email});

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "user already exists with this email"
        })
    }

    const hash= crypto.createHash("md5").update(password).digest("hex")

    const user=await userModel.create({
        name, email, password:hash
    })

    const token= jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token', token)

    res.status(201).json({
        message: "user registered",
        user,
    })
})


authRouter.post('/login',async (req,res)=>{
    const {email,password}=req.body;


    const user= await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }

    //user.password is password from backend and password is from the client side
    const isPasswordMatched= user.password===crypto.createHash('md5').update(password).digest('hex');

    if(!isPasswordMatched){
        return res.status(401).json({
            message: "invalid credentials"
        })
    }


    const token=jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie('jwt_token', token);

    res.status(200).json({
        message: "user logged-in",
        user,
    })
})


authRouter.get('/get-me', async(req,res)=>{
    const token= req.cookies.token;

    const decoded= jwt.verify(token, process.env.JWT_SECRET);

    const user= await userModel.findOne(decoded.id);

    res.status(200).json({
        name: user.name,
        email:user.email
    })
})



module.exports= authRouter;

//for writing API codes other than app.js we use express.Router() function.
//jwt tokens are like signatures of servers by which we can identify easily which user's request has come. this helps in securing our authentication part.
//any function which runs after hitting an API is also called as a controller. like async(req,res){} can be called flat-arrow function, callback, normal function and a controller.

/* when we store our data in the database it is also very risky because what if our DB breaches and gets leaked to the internet and anyone can login to our profiles. to save this we hash our password stored in the DB. we use hashing because:
        - hashing of same data gives same results always
        - we can not reverse the hashing to find what that means..this secures our passwords.

jwt.verify is used to check whether our token is created by our own server or not. the /get-me API is used to give the register credentials to the user. 
*/