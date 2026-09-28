const songModel= require("../models/song.model");
const storageService= require("../services/storage.service");
const musicMetaData = require("music-metadata");


async function uploadSong(req,res){
    const songBuffer= req.file.buffer;
    const {mood}= req.body

    const metadata= await musicMetaData.parseBuffer(songBuffer);
    
    const songFile= await storageService.uploadFile({
        buffer: songBuffer,
        filename: metadata.common.title + ".mp3",
        folder: "moodster/songs"
    })

    let posterFile = null;

    const picture = metadata.common.picture?.[0];

    if (picture) {
        posterFile = await storageService.uploadFile({
            buffer: picture.data,
            filename: metadata.common.title + ".jpeg",
            folder: "moodster/posters"
        });
    }

    const title = metadata.common.title || "Unknown Song";
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



module.exports= {uploadSong};