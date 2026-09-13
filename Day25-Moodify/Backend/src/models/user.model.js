// iska kaam h schema or models create krna taaki kesa bhi data ko database me store kr sake or uspe operations perform kr sake

const mongoose= require("mongoose");

const userSchema= new mongoose.Schema(
    {
        username:{
            type: String,
            requires: [true, "username is required"],
            unique: [true, "username already exists"]
        },
        email:{
            type: String,  
            required: [true, "email is required.."],
            unique: [true, "email already exists"]
        },
        password:{
            type: String,
            required: [true, "password is required.."],
            select: false
        }
    }
)

const userModel= mongoose.model("Users", userSchema);

module.exports= userModel;