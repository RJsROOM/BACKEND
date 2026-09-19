import FormGroup from "../components/FormGroup"
import "../style/register.scss"
import { Link } from "react-router"

const Register = () => {
  return (
    <main className="register-page">
        <div className="form-container">
            <h1>Register here -</h1>
            <form>
                <FormGroup label="Name" placeholder="Enter your name" />
                <FormGroup label="Email" placeholder="Enter your Email" />
                <FormGroup label="Password" placeholder="Enter your password" />
                <button className="button" type="submit">
                    Register..
                </button>
            </form>
            <p>
                Already have an account?
                <Link to="/login"> Login Here</Link>
            </p>
        </div>
    </main>
  )
}

export default Register