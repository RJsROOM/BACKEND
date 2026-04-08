// this file has two purposes: to configure the server and create the server

const express= require('express');

const app= express();

app.use(express.json())

const notes=[]

app.get("/", (req,res)=>{
    res.send("welcome to Home page")
})

app.post("/notes", (res,req)=>{
    notes.push(req.body)
    res.send("note added")
})

app.get("/notes", (req,res)=>{
    res.send(notes)
})

app.delete("/notes/:id", (req,res)=>{
    delete notes[req.params.id];
    res.send("note deleted successfully")
})

app.patch("/notes/:id", (req,res)=>{
    notes[req.params.id].description= req.body.description;
    res.send("note updated successfully")
})




module.exports=app