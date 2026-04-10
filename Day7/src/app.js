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


app.get("/notes",async (req,res)=>{
    const notes= await noteModel.find()

    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})


module.exports=app;


//noteModel.find() always gives output in array of objects format even if there is only one note in database or no note at all. If there is no note at all then it gives empty array as output.