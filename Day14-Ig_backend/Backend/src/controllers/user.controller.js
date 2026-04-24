const followModel= require('../models/follow.model')



async function followUserController(req, res){


    // validationn- 01
    const followerUsername= req.user.username;
    const followeeUsername= req.params.username;

    if(followeeUsername == followerUsername){
        return res.status(400).json({
            message: "You can not follow yourself."
        })
    }


    // validation- 02
    const isFolloweeExists= await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            message: "User not found."
        })
    }


    // validation- 03
    const isAlreadyFollowig= await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if(isAlreadyFollowing){
        return res.status(200).json({
            message: "You are already following this user.",
            follow: isAlreadyFollowing
        })
    }




    const followRecord= await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        foloow: followRecord
    })

}


async function unfollowUserController(req,res){
    const followerUsername= req.user.username;
    const followeeUsername= req.params.username;

    const isUserFollowing= await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}


module.exports={
    followUserController,
    unfollowUserController
}
