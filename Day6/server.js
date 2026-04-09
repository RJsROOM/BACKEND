//iska kaam: server ko start karna and database se connect karna

const app= require('./src/app');

const mongoose= require('mongoose');

function connectToDb(){
    mongoose.connect("mongodb+srv://rakshitjha05_db_user:6U0Knbxshy5nyvG6@cluster0.jetfkkr.mongodb.net/day6")
    .then(()=>{
        console.log("connected to DB")
    })
}

connectToDb();

app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})

/*  
mongoose.connect("connection_string/database name") : if there is no database with the given name "database_name" then the mongoose automatically creates one itself and connects to it. so we dont have to create a database manually in mongodb atlas. we can just give the name of the database in the connection string and mongoose will take care of the rest.

also the connection strings should be private and we should hide it from leaking into the public. so we use environment variables to hide the things and pass it to the gitignore file so that it doesn't gets pushed to our public repo.

*/