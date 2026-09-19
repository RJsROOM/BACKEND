import "../style/login.scss"

const Login = () => {
  return (
    <main className="login-page">
        <div className="form-container">
            <h1>Login</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="passowrd">Password</label>
                    <input type="passowrd" id="password" name="passowrd" required />
                </div>
                <button className="button" type="submit">Login..</button>
            </form>
        </div>
    </main>
  )
}

export default Login


/*

idhr form tag k andr jese hmare paas form-group h jo hme repeat me likna pr rha h to agr repweat krna prega hme to uske lie q na hm ek component hi bnale "formgroup" naam ka. components are basically the reusable segments of code n! to jaha hme components bnaana chiye udhr bnakr kr use krlena chiye. 

*/