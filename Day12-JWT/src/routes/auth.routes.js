//iska kaam: authentication related APIs ka code rkhna

const express= require('express');
const userModel= require('../models/user.model')
const jwt= require('jsonwebtoken')

const authRouter= express.Router();

authRouter.post('/register',async (req,res)=>{
    const {name,email,password}= req.body;

    const isUserAlreadyExists= await userModel.findOne({email});

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "user already exists with this email"
        })
    }


    const user=await userModel.create({
        name, email, password
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



module.exports= authRouter;

//for writing API codes other than app.js we use express.Router() function.
//jwt tokens are like signatures of servers by which we can identify easily which user's request has come. this helps in securing our authentication part.