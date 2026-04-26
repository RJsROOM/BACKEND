import { useState } from 'react';
import '../style/form.scss'
import { Link } from 'react-router-dom'

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    async function handleSubmit(e){
        e.preventDefault();

    }



  return (
    <main>
        <div className="form-container">
            <h1>
                Login
            </h1>
            <form onSubmit={handleSubmit}>
                <input 
                    onInput={(e)=>setUsername(e.target.value)}
                    type="text" 
                    placeholder="Enter Username" 
                    name="username" 
                />

                <input 
                    onInput={(e)=>setPassword(e.target.value)}
                    type="password" 
                    placeholder="Enter Password" 
                    name="password" 
                />

                <button type="submit">
                    Login
                </button>
            </form>

            <p>Don't have an account? <Link className='toggleAuthForm' to='/register'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login

/*
study about the react architecture from notes:

there are 4 layers in the react architecture--
1. UI layer which handles only the UI of our pages.
2. the hooks (orchestration) which handles the usage of all the hooks
3. state layer it is responsible for handling the states of whole application
4. API layer is reponsible for handling all the api calls and requests.

like we have used the api calling in login and register pages, we now have to shift them into the API layer. which is put under sevices folder with the name of auth.api.js

*/