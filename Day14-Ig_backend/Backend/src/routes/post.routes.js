const express= require('express');
const postController=  require('../controllers/post.controller')
const multer= require('multer')
const upload= multer({storage: multer.memoryStorage()})
const idenntifyuser= require('../middlewares/auth.middleware');
const identifyuser = require('../middlewares/auth.middleware');


const postRouter= express.Router();

/*
POST /api/posts/createpost [protected]-{if token then only create post}
req.body- {caption, imageUrl}
*/
postRouter.post('/createpost',upload.single('image'), identifyuser, postController.createPostController)


/*
GET /api/posts/getpost [protexted]
*/
postRouter.get('/getpost', identifyuser, postController.getPostController)


/*
GET /api/posts/details/:postid
    - return details of a specific post
    - also check whether the request was made by that same user or not and then only send details
*/
postRouter.get('/details/:postid', identifyuser, postController.getDetailsOfPostController)


/*
    @route POST /api/posts/like/:postid
    @description like the post with the postid provided in params
*/
postRouter.post('/like/:postId', identifyuser, postController.likePostController)



module.exports= postRouter

/*
by using multer we use temporary memory storage-RAM option which enables us to store our files to the cloud services like imagekit.io and not on our own server.
and we use the name by which our frontend sends our data in the upload.

*/