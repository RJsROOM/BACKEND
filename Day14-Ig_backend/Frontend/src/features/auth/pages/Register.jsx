import '../style/form.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {useAuth} from '../hooks/useAuth'
import {useNavigate} from 'react-router-dom'


const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");


    const {handleRegister, loading}= useAuth();
    const navigate= useNavigate();

    if(loading){
        return <h1> Loading... </h1>
    }


    async function handleSubmit(e){
        e.preventDefault();
        
        handleRegister(username, email, password)
        .then(res=>{
            console.log(res)
            navigate('/')
        })
    }


  return (
    <main>
        <div className="form-container">
            <h1>
                Register
            </h1>
            <form onSubmit={handleSubmit}>
                <input 
                    onInput={(e)=>{setUsername(e.target.value)}}
                    type="text" 
                    name='username' 
                    placeholder='Enter Username' 
                />

                <input 
                    onInput={(e)=>{setEmail(e.target.value)}}
                    type="email" 
                    name='email' 
                    placeholder='Enter your Email' 
                />

                <input 
                    onInput={(e)=>{setPassword(e.target.value)}}
                    type="password" 
                    name='password' 
                    placeholder='Enter Password' 
                />

                <button 
                    type='submit'
                >
                    Register
                </button>
            </form>

            <p>Already have an account? <Link className='toggleAuthForm' to='/login'>Login</Link></p> 
        </div>
    </main>
  )
}

export default Register

/*
remember that axios by default does'nt passes any value to our browser..like tokens and cookies. for this we pass another object to the axios named withCredentials:true.


*/

/*
study about the react architecture from notes:

there are 4 layers in the react architecture--
1. UI layer which handles only the UI of our pages.
2. the hooks (orchestration) which handles the usage of all the hooks
3. state layer it is responsible for handling the states of whole application
4. API layer is reponsible for handling all the api calls and requests.

like we have used the api calling in login and register pages, we now have to shift them into the API layer.which is put under sevices folder with the name of auth.api.js

and for setting the states layer we can use Redux but here we will use Context..for this we create auth.context.js file under the auth folder only.


our this UI layer only communicates with the hook layer and doesn't cares about what happens in the state and api layers because the hoo will communicate with state layer and state with api layer itself.

*/