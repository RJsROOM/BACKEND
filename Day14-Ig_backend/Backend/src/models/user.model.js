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

/*
for storing id's of the users, one id takes approx 12bytes of the space and depeneding upon the following and followers that may go in GIGABYTES for just a single user. and our mongoDb only allows us the space of 16MB.

for this we use EDGE COLLECTIONS, the collection which tells us the relations between the documents of the collection that collectionn is called as edge collection.

and for this we create another model for them.


*/