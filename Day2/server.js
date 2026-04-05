const express= require('express');

const app= express();  //server instance is created


//server started and listening on port 3000
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");  
})

app.get('/', (req,res)=>{
    res.send("Home page");
})

app.get('/about', (req,res)=>{
    res.send("About page");
})

app.get('/services', (req,res)=>{
    res.send("services we offer");
})
