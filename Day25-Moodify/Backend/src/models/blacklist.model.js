const mongoose= require("mongoose");

const blacklistSchema= new mongoose.Schema({

    token:{
        type: String,
        requires: [true, "token is required for blacklisting"]
    }
}, {
    timestamps: true
})

const blacklistModel= mongoose.model("blacklistTokens", blacklistSchema);



module.exports= blacklistModel;