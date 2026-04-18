const mongoose= require('mongoose');


const userSchema= new mongoose.Schema(
    {
        username:{
            type: String,
            required: [true, "username is required"],
            unique: [true, "username already exists"]
        },
        profileImg:{
            type: String,
            default: "https://ik.imagekit.io/qbtyrmiqx/avatar-default-user-profile-icon-simple-flat-grey-vector-57234191.webp?updatedAt=1771067430807"
        },
        email:{
            type: String,
            unique: [true, "email already exists"]
        },
        password:{
            type: String,
            required: true
        },
        bio:{
            type: String
        }
    }
)

const userModel= mongoose.model('users', userSchema);


module.exports= userModel;