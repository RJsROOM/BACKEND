// iska kaam: server create karna or server ka config karna

const express= require('express');
const noteModel= require('./models/notes.model')

const app= express();

app.use(express.json());

const notes=[];

app.post("/notes", async (req,res)=>{
    const {title, description}= req.body;

    const note=await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "note created successfully",
        note
    })
})

app.get("/notes", (req,res)=>{
    res.status(200).json(()=>{
        notes: notes
    })
})

app.delete("/notes/:id", (req,res)=>{
    delete notes[req.params.id];
    res.status(200).json(()=>{
        message: "note deleted"
    })
})

app.patch("/notes/:id", (req,res)=>{
    notes[req.params.id].description= req.body.description;
    res.status(200).json(()=>{
        message: "note updated successfully"
    })
})



module.exports=app;