import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

const app=express();

//middlewares
app.use(express.json());
app.use(cookieParser());


app.get("/", (req,res)=>{
    res.json({message: "server is running on port 3000"});
})

app.use("/api/auth", authRouter);


export default app;