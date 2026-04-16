//iska kaam: server create karna or uska config krna

const express= require('express')
const authRouter=require('../src/routes/auth.routes')

const app=express();
app.use(express.json())



app.use('/api/auth', authRouter)


module.exports= app

//we don;t usually write the API odes here as it makes the file very junky and diff to understand. for this we use routes folders in which we differentiate our files whether they authentication,authorisation,validation or verification. and export from there to use them here.

//after importing the authRouter if we want to use it then we must call it in a middleware like app.use('/api/auth', authRouter) by this our api url will have api/auth prefix before them.