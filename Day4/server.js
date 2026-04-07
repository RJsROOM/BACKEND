//this file has one purpose to start server 

const app= require("./src/app");


app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})



// app.use(express.json());



