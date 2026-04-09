// this file has two purposes: to configure the server and create the server

const express= require('express');

const app= express();

app.use(express.json())



const notes=[]

app.get("/", (req,res)=>{
    res.send("welcome to Home page")
})

app.post("/notes", (req,res)=>{
    notes.push(req.body)
    res.status(201).json({
        message: "note created successfully"
    })
})

app.get("/notes", (req,res)=>{
    res.status(200).json({
        notes:notes
    })
})

app.delete("/notes/:id", (req,res)=>{
    delete notes[req.params.id];
    res.status(200).json({
        message: "note deleted successfully"
    })
})

app.patch("/notes/:id", (req,res)=>{
    notes[req.params.id].description= req.body.description;
    res.status(200).json({
        message: "note updated successfully"
    })
})




module.exports=app

// coomon status codes:
/*   
-------Category: successful responses-------
 200: OK the request was successful and the server responded with the requested data

 201: a new resource has been created successfully

 204: the request was successfull but there is no content to return

since evrry restart the system gives new RAM to our server and this causes empty notes array for solving this we use the databases for storing the data.

*/