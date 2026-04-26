//this is the API layer of react architecture layers.


import axios from 'axios';

const api= axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials:true
})


export async function register(username, email, password){

    try{
        const response=await api.post("/register",{
            username,
            email,
            password
        })

        return response.data;
    }
    catch(err){
        console.error("Register failed:", err.message)
    }
}


export async function login(email, password){
    try{
        const response=await api.post("/login",{
            email,
            password
        })

        return response.data;
    }
    catch(err){
        console.error("RLogin failed:", err.message)
    }
}

export async function getMe(){
    try{
        const response= await axios.get('/get-me')

        return response.data
    }
    catch(err){
        console.error("Request failed:", err.message)
    }
}


/*
when we have repetitive codes written then th eaxios gives us the power to remove them like used above in api.



*/