//server is invoked
const express=require('express');  

//server instance is created
const app= express();

//middleware to parse incoming request body as JSON
app.use(express.json())  


const notes= []



app.get('/', (req,res)=>{
    res.send("This is home page")
})

app.get('/about', (req,res)=>{
    res.send("This is about page")
})

app.get('/services', (req,res)=>{
    res.send("This is services page")
})


app.post('/notes', (req,res)=>{
    notes.push(req.body)
    res.send(notes)
})

app.get('/notes', (req,res)=>{
    res.send(notes)
})






//server is running on port 3000
//the callback runs when our server is good to go and listening to the port
app.listen(3000, ()=>{
    console.log("server is running onport 3000")
})

//an API is a set of rules or protocols which are used to share data with softwares accross the internet and enables the communications for softwares with data.

//REST-API(representational state transfer) is an architectural style for designing networked applications, it relies on stateless, client server communication over HTTP/HTTPS using standard methods and status codes. 
// everything that can be accessed via REST API is considered a 'resource'. each resource has a unique identifier(URI). resources are represented in JSON or XML format. each request from client to server contains all needed information, the server doesn't stor eany state about the client session.

// HTTP methods---
// GET: retrieves a resource or a list of resources from the server and is not responsible for any modifications. 
// POST: creates a new resource on the server the request contains the data which should be created. 
// PUT: updates a resouce by replacing it with new data requires complete new representation in the request body. 
// PATCH: updates a resource by partially modifying it. requires only the modified fields in the request body. 
// DELETE: deletes a resource from the server.
//{an idempotent method produces the same result no matter how many times it is invoked. beside POST all are idempotent in nature.}

// bydefault express doesn't parse the incoming request body, we need to use middleware to do that. and that middleware is app.use(express.json()).