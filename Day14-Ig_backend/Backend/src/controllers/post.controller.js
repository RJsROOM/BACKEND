const postModel= require('../models/post.model');
const ImageKit= require('@imagekit/nodejs')
const {toFile}= require('@imagekit/nodejs')
const jwt= require('jsonwebtoken')


const imagekit= new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    // console.log(req.body,req.file)

    const token= req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "unauthorised access"
        })
    }

    let decoded= null;

    try{
        decoded= jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message: "user not found"
        })
    }

    const file= await imagekit.files.upload({
        file: req.file.buffer.toString('base64'),
        fileName: "images",
        folder: "insta_clone"
    })

    const post= await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })
}

async function getPostController(req,res){
    const token= req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "unauthorised access"
        })
    }


    let decoded=null;
    try{
        decoded= jwt.verify(token,process.env.jWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message: "token invalid"
        })
    }

    const userId= decoded.id;

    const posts= await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "posts fetched successfully",
        posts
    })
    
}

async function getDetailsOfPostController(req,res){

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "unauthorised access"
        })
    }

    let decoded;
    try{
        decoded= jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({
            message: "user not found"
        })
    }

    const userId= decoded.id
    const postId= req.params.postid;

    const post= await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "post not found"
        })
    }

    const isValidUser= post.user.toString() === userId;
    if(!isValidUser){
        return res.status(403).json({
            message: "forbidden access request"
        })
    }

    return res.status(200).json({
        message: "post details fetched successfully",
        post
    })

}

module.exports={
    createPostController,
    getPostController,
    getDetailsOfPostController
}

/*
line-110--- when we are comparing two object id we have two method- equals() and toString()...and using toString() was more suitable because the decoded gives userId as a string and so we converted our post.user to string

*/