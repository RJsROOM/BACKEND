const songModel= require("../models/song.model");



async function uploadSong(req,res){
    console.log(req.file);
}



module.exports= {uploadSong};