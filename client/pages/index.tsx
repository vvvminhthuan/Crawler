import Link from 'next/link'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SignIn from 'redux/actions/SignIn'

const Login = (signIn, actions) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('signIn', actions)
    }
    return (
        <div className="card-login">
            <div className="card-header">
                <h3 className="card-title">Crawler systems</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form onSubmit = {(e) => handleSubmit(e)}>
                <div className="card-body">
                    <div className="form-group flex-c">
                        <input type="text" name="email" className="form-control"/>
                        <label htmlFor="email">Email address</label>
                        <span className="error">Please enter a email address</span>
                    </div>
                    <div className="form-group flex-c">
                        <input type="password" name="password" className="form-control"/>
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



function mapStateToProps(state) {
    return {
        signIn: state.signIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(SignIn, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)