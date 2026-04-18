const express= require('express');
const userModel= require('../models/user.model')
const crypto= require('crypto')
const jwt= require('jsonwebtoken')

const authRouter= express.Router();


authRouter.post('/register', async(req,res)=>{
    const {username,email,password,bio,profileImg}= req.body;
    

    // const isUserExistByEmail= await userModel.findOne({email});
    // const isUserExistByUsername= await userModel.findOne({username});

    // if(isUserExistByEmail || isUserExistByUsername){
    //     res.status(409).json({
    //         message: "user already exists with this email or username"
    //     })
    // }

    // OR--

    const isUserAlreadyExists= await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "user already exists with this " + (iseUserAlreadyExists.email==email ? "email" : "username")
        })
    }


    const hash= crypto.createHash('sha256').update(password).digest('hex');

    const user= await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImg
    })

    /* we store these in token which--
        -user ka data hona chiye
        -data unique hona chiye  
    */
    const token= jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {expiresIn: "1d"})


    res.cookie('token', token);

    res.status(201).json({
        message: "user registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImg: user.profileImg
        }
    })
})



module.exports= authRouter;



//$or:[] -- it queries through our db whether any of the elements inside in it are available or not