//iska kaam h database component create krna

const mongoose= require("mongoose");


function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to Db")
    })
    .catch(err =>{
        console.log("error connecting to DB", err)
    })
}

module.exports= connectToDb;