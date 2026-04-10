//iska kaam: server create karna or uska config karna

const express= require('express');
const noteModel = require('./models/notes.model');

const app= express();

app.use(express.json());


app.post('/api/notes',async (req,res)=>{
    const note=await noteModel.create(req.body)

    res.status(201).json({
        message: "note created successfully",
        note
    })
})

app.get('/api/notes', async (req,res)=>{
    const notes= await noteModel.find()
    res.status(200).json({
        message: "notes fetched successfully",
        notes
    })
})

app.delete('/api/notes/:id',async (req,res)=>{
    await noteModel.findByIdAndDelete({_id: req.params.id})

    res.status(200).json({
        message: "note deleted successfully"
    })
})

app.patch('/api/notes/:id',async (req,res)=>{
    await noteModel.findByIdAndUpdate({_id: req.params.id}, req.body)

    res.status(200).json({
        message: "note updated successfully"
    })
})
/*  
ABOVE CODE CAN ALSO BE WRITTEN--(id we dont know by which name id is mentioned in our Db like-_id) then we must use this below method
app.patch('/api/notes/:id',async (req,res)=>{
    const id= req.params.id;
    const {description}= req.body;
    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message: "note updated successfully"
    })
})
*/


module.exports=app