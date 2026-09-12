// iska kaam h server ko create krna or uska config krna

const express= require("express");
const cookieParser= require("cookie-parser");

const app= express();
app.use(express.json());
app.use(cookieParser());

/*
    Routes
*/
const authRoutes= require("./routes/auth.routes");

app.use("/api/auth", authRoutes)



module.exports= app;