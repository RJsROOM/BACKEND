import "../style/login.scss"
import FormGroup from "../components/FormGroup"
import { Link } from "react-router"

const Login = () => {
  return (
    <main className="login-page">
        <div className="form-container">
            <h1>Login</h1>
            <form>
                <FormGroup label="Email" placeholder="Enter your email" />
                <FormGroup label="Password" placeholder="Enter your password" />
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