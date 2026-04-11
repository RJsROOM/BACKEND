//iska kaam: server create karna or uska config karna

const express= require('express');
const noteModel = require('./models/notes.model');
const cors= require('cors')
const path= require('path')

const app= express();

app.use(express.json());
app.use(cors())
app.use(express.static('./public'))


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

app.use('*name', (req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})


module.exports=app

//the CORS error is that error which tells that you can't access another site's data from your site.

//*name is the wildcard api which redirects all our non-created routes to the response we write inside it.

//__dirname gives us the absolute path of our file in which it is written and since we have to give the address till index.html which we imported from frontend so we write those lines of code...{very helpful-production wise}

//app.use(express.static("./public"))---on line 12---it gives the css and js static files from the public folder to the *name(all) wildcards so that if user hits any foreign route then it should only show our note creation page.