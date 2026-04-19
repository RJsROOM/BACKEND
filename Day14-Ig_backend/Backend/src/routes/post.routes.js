const express= require('express');
const postController=  require('../controllers/post.controller')
const multer= require('multer')
const upload= multer({storage: multer.memoryStorage()})


const postRouter= express.Router();

/*
POST /api/posts/createpost [protected]-{if token then only create post}
req.body- {caption, imageUrl}
*/
postRouter.post('/createpost',upload.single('image'), postController.createPostController)


module.exports= postRouter

/*
by using multer we use temporary memory storage-RAM option which enables us to store our files to the cloud services like imagekit.io and not on our own server.
and we use the name by which our frontend sends our data in the upload.

*/