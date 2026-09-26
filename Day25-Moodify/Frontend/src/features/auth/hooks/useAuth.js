import {login, register, getMe, logout} from "../services/auth.api";
import {useContext, useEffect} from "react";
import { AuthContext } from "../auth.context.jsx";

export const useAuth= ()=>{
    const context= useContext(AuthContext);
    const {user,setUser,loading,setLoading}= context;

    async function handleRegister({email,username,password}){
        setLoading(true);
        const data= await register({username,email,password})
        setUser(data.user);
        setLoading(false);
    }

    async function handleLogin({email,username,password}){
        setLoading(true);
        const data= await login({username,email,password})
        setUser(data.user);
        setLoading(false);
    }

    async function handleGetMe(){
        setLoading(true);
        const data= await getMe();
        setUser(data.user);
        setLoading(false);
    }

    async function handleLogout(){
        setLoading(true);
        const data= await logout();
        setUser(null);
        setLoading(false);
    }

    useEffect(()=>{
        handleGetMe();
    },[])

    
    return ({
        user,
        loading,
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout
    })
}

/*

whenever the register function/api is called it returns us the data as an object in which we have user field so to access only user we type data.user.

*/