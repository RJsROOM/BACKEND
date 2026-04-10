//iska kaam: database me jo bhi store kroge uska format(schema) define karna

const mongoose= require('mongoose');

const noteSchema= new mongoose.Schema({
    title: String,
    description: String,
})

const noteModel= mongoose.model("notes", noteSchema);


module.exports= noteModel;

//"notes" is the name of collection in database where all the notes will be stored

//schema: database me store hone wale data ka format 
// model: database me agar CRUD ya kesa bhi operation perform karne k lie models create krte h