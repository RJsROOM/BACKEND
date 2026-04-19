const postModel= require('../models/post.model');
const ImageKit= require('@imagekit/nodejs')
const {toFile}= require('@imagekit/nodejs')

const imagekit= new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    // console.log(req.body,req.file)

    const file= await imagekit.files.upload({
        file: req.file.buffer.toString('base64'),
        fileName: "test"
    })

    res.send(file)
}


module.exports={
    createPostController
}