//iska kaam: server start karna or database se connect karna

require('dotenv').config()
const app= require('./src/app');

const connectToDb= require('./src/config/database');

connectToDb()

app.listen(3000, ()=>{
    console.log("server is running on port 3000");

})

