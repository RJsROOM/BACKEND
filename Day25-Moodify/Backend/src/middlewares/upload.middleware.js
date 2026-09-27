const multer= require("multer");


const storage= multer.memoryStorage();


const upload= multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*15   //5MB max file sixe. it stores in Bytes
    }
})


module.exports= upload;