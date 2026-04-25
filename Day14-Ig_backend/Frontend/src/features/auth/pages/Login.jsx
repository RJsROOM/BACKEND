import '../style/form.scss'

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
        </div>
    </main>
  )
}

export default login