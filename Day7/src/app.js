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



module.exports=app;