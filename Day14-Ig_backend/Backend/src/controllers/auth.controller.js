const userModel= require('../models/user.model')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')



async function registerController(req,res){
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


    const hash= await bcrypt.hash(password, 10);

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
        id: user._id,
        username: user.username
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
}


async function loginController(req,res){
    const {email,username,password}= req.body;

    /* login can be done via--
        username-password || email-password  
    */
    const user= await userModel.findOne({
        $or:[
            {
                // condition 1
                email: email
            },
            {
                // condition 2
                username: username
            }
        ]
    })


    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }


    // const hash= await bcrypt.hash(password, 10);
    const isPasswordValid= await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message: "invalid credentials"
        })
    }


    const token= jwt.sign({
        id:user._id,
        username: user.username
    }, process.env.JWT_SECRET, {expiresIn: "1d"})


    res.cookie('token', token)

    res.status(200).json({
        message: "user logged-in successfully",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImg: user.profileImg
        }
    })
}



module.exports={
    registerController,
    loginController
}

//$or:[] -- it queries through our db whether any of the elements inside in it are available or not

/*  

since we were saving passwords from the user in hash format and everytime we were comparing by converting and matching it from the db..this is very tedious form of development and is not preferred in the industry. crypto is very low level and has very few features than the bcryptjs
so we use a library bcryptjs to solve this issue.
bcypt.has(password, 10) 10 is the salt which tells how many layers of hashing to be done.

*/