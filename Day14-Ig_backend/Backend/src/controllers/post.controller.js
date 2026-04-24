const postModel= require('../models/post.model');
const ImageKit= require('@imagekit/nodejs')
const {toFile}= require('@imagekit/nodejs')
const jwt= require('jsonwebtoken')
const likeModel= require('../models/like.model')


const imagekit= new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    // console.log(req.body,req.file)

    const file= await imagekit.files.upload({
        file: req.file.buffer.toString('base64'),
        fileName: "images",
        folder: "insta_clone"
    })

    const post= await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })
}

async function getPostController(req,res){

    const userId= req.user.id;

    const posts= await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "posts fetched successfully",
        posts
    })
    
}

async function getDetailsOfPostController(req,res){

    const userId= req.user.id
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

async function likePostController(req,res){
    const username= req.user.username;
    const postId= req.params.postId;

    const post= await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "post not found"
        })
    }


    const like= await likeModel.create({
        post: postId,
        user: username
    })


    res.status(200).json({
        message: "post liked successfully",
        like
    })

}

module.exports={
    createPostController,
    getPostController,
    getDetailsOfPostController,
    likePostController
}

/*
line-110--- when we are comparing two object id we have two method- equals() and toString()...and using toString() was more suitable because the decoded gives userId as a string and so we converted our post.user to string

since we have hecked for the user in every API and this makes our code very bad so to remove this we create our middleware in the middlewares folder(auth.middleware.js) so that the repetitive tasks are not written over and over agian.

*/