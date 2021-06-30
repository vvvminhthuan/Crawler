import Link from 'next/link'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signIn } from 'redux/actions/SignIn'

const Login = ({signIn, actionSignIn}) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        actionSignIn.signIn()
        console.log('signIn', signIn)
    }
    return (
        <div className="login-page">
            <div className="card-login">
                <div className="card-header">
                    <h3 className="card-title">Crawler systems</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form method='POST' onSubmit = {(e) => handleSubmit(e)}>
                    <div className="card-body">
                        <div className="form-group flex-c">
                            <input type="text" name="email" className="form-control" required/>
                            <span className="form-line"></span>
                            <label htmlFor="email">Email</label>
                            <span className="error">Please enter a email address</span>
                        </div>
                        <div className="form-group flex-c">
                            <input type="password" name="password" className="form-control" required/>
                            <span className="form-line"></span>
                            <label htmlFor="password">Password</label>
                            <span className="error">Please provide a password</span>
                        </div>
                    </div>
                    <div className="card-footer flex-c">
                        <Link href="#"><a className="link-register">Forgot Password</a></Link>
                        <button type="submit" className="btn-sign">Sign in</button>
                        <Link href="#"><a className="link-register">Signup</a></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionSignIn: bindActionCreators({signIn}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)