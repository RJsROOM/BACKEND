import '../style/form.scss'
import { Link } from 'react-router-dom'

const login = () => {
  return (
    <main>
        <div className="form-container">
            <h1>
                Login
            </h1>
            <form>
                <input type="text" placeholder="Enter Username" name="username" />
                <input type="password" placeholder="Enter Password" name="password" />
                <button type="submit">
                    Login
                </button>
            </form>

            <p>Don't have an account? <Link className='toggleAuthForm' to='/register'>Register</Link></p>
        </div>
    </main>
  )
}

export default login