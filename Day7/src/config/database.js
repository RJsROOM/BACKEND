//iska kaam database se connect karna

const mongoose= require('mongoose')

const connectToDb=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to DB")
    })
}

connectToDb();

module.exports=connectToDb;