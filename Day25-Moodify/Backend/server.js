// iska kaam h server ko start krna or backend se connect krna

require("dotenv").config();
const app= require("./src/app");
const connectToDb= require("./src/config/database")

connectToDb();

app.listen(3000, ()=>{
    console.log("server is running port 3000")
})