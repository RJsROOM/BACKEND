//iska kaam: server create karna or uska config karna 
const express= require('express');
const cookieParser= require('cookie-parser')
const authRouter= require('./routes/auth.routes')
const postRouter= require('./routes/post.routes')


const app= express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)



module.exports=app;

/*
since we know that our express can't read the data from postman automatically so we use the middlewares.
for reading the data in raw formats we used express.json()
similarly for reading data in form-data formats we use multer.
this multer middleware is used in the routes file where it is required.


*/