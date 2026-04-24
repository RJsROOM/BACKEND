const express= require('express')
const userController= require('../controllers/user.controller')
const identifyUser= require('../middlewares/auth.middleware')


const userRouter= express.Router();



userRouter.post('/follows/:username',identifyUser, userController.followUserController)



userRouter.post('/unfollow/:username',identifyUser, userController.unfollowUserController)





module.exports= userRouter;