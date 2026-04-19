const mongoose= require('mongoose');

const postSchema= new mongoose.Schema(
    {
        caption:{
            type: String,
            default:[true, ""]
        },
        imgUrl:{
            type: String,
            default:[true,"img url is required for post creation."]
        },
        user:{
            ref: "users",
            type: mongoose.Schema.Types.ObjectId,
            required:[true, "user id is required"]
        }
    }
)


const postModel=mongoose.model('posts', postSchema);


module.exports= postModel;

//when you require the reference of another collection for traversing their data we use ref and give type as shown above in the user object of the scehma.