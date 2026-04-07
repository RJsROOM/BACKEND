// this file has two purpose: server creation and server configureation

const express= require('express');

const app= express();

app.use(express.json());


const notes=[]



app.get("/", (res,req)=>{
    res.send("welcome to notes app")
})

app.post("/notes", (req,res)=>{
    notes.push(req.body);
    res.send("note created")
})

app.get("/notes", (req,res)=>{
    res.send(notes)
})

app.delete("/notes/:ind", (req,res)=>{
    delete notes[req.params.ind];
    res.send("note deleted")
})

app.patch("/notes/:ind", (req,res)=>{
     if (!notes[req.params.ind]) {
        return res.status(404).send("Note not found");
    }
    notes[req.params.ind].description= req.body.description
    res.send("note updated")
})



module.exports=app