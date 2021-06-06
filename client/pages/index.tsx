import Link from 'next/link'

const Login = () => {
    return (
        <div className="card-login">
            <div className="card-header">
                <h3 className="card-title">Crawler systems</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form>
                <div className="card-body">
                    <div className="form-group flex-c">
                        <input type="text" name="email" className="form-control" required/>
                        <label htmlFor="email">Email address</label>
                        <span className="error">Please enter a email address</span>
                    </div>
                    <div className="form-group flex-c">
                        <input type="password" name="password" className="form-control" required/>
                        <label htmlFor="password">Password</label>
                        <span className="error">Please provide a password</span>
                    </div>
                </div>
                <div className="card-footer flex-c">
                    <button type="submit" className="btn-sign">Sign in</button>
                    <Link href="#"><a className="link-register">Forgot Password</a></Link>
                    <Link href="#"><a className="link-register">Register</a></Link>
                </div>
            </form>
        </div>
    )
}
  
export default Login