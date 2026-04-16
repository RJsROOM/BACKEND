//iska kaam: authentication related APIs ka code rkhna

const express= require('express');
const userModel= require('../models/user.model')

const authRouter= express.Router();

authRouter.post('/register',async (req,res)=>{
    const {name,email,password}= req.body;

    const user=await userModel.create({
        name, email, password
    })

    res.status(201).json({
        message: "user registered",
        user: user
    })
})



module.exports= authRouter;

//for writing API codes other than app.js we use express.Router() function.