const songModel= require("../models/song.model");
const storageService= require("../services/storage.service");
const musicMetaData = require("music-metadata");


async function uploadSong(req,res){
    const songBuffer= req.file.buffer;
    const {mood}= req.body

    const metadata= await musicMetaData.parseBuffer(songBuffer);

    const picture = metadata.common.picture?.[0];
    const title = metadata.common.title || "Unknown Song";

    // we use Promise.all() to manage all the async operations at once. it sayas if and only if(iff) the objects in it give some response we can not move aheads wiht the code. also promise.all() recives teh an array of items....this all optimizes our code with 33% atleast.
    const [songFile, posterFile]= await Promise.all([
        storageService.uploadFile({
        buffer: songBuffer,
        filename: metadata.common.title + ".mp3",
        folder: "moodster/songs"
        }),
        picture ? 
            storageService.uploadFile({
            buffer: picture.data,
            filename: metadata.common.title + ".jpeg",
            folder: "moodster/posters"
            })
        : null
    ])

    
    const song= await songModel.create({
        title: title,
        url: songFile.url,
        posterUrl: posterFile?.url || null,
        mood
    })
    
    res.status(201).json({
        messgae:"song created successfully",
        song
    })
}

async function getSong(req,res){
    const {mood} = req.query

    const song= await songModel.findOne({
        mood
    })

    res.status(200).json({
        message: "song fetched successfully",
        song
    })
}



module.exports= {uploadSong, getSong};