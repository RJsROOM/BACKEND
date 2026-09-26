import "../style/login.scss"
import { useState } from "react"
import FormGroup from "../components/FormGroup"
import { Link } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router" 

const Login = () => {

    const {loading, handleLogin} = useAuth();

    const navigate= useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    
    async function handleSubmit(e){
        e.preventDefault();
        await handleLogin({email, password})
        navigate("/")
    }

    return (
    <main className="login-page">
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit= {handleSubmit}>
                <FormGroup 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    label="Email" 
                    placeholder="Enter your email" 
                />
                <FormGroup 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    label="Password" placeholder="Enter your password" 
                />
                <button className="button" type="submit">
                    Login..
                </button>
            </form>
            <p>
                Don't have an account? 
                <Link to="/register"> Register Here</Link>
            </p>
        </div>
    </main>
    )
}

export default Login


/*

idhr form tag k andr jese hmare paas form-group h jo hme repeat me likna pr rha h to agr repweat krna prega hme to uske lie q na hm ek component hi bnale "formgroup" naam ka. components are basically the reusable segments of code n! to jaha hme components bnaana chiye udhr bnakr kr use krlena chiye. 

*/