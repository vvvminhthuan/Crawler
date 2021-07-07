import Link from 'next/link'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signIn } from 'redux/actions/SignIn'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { apiSignIn } from 'api/Auth'
import {useCustomForm, JOI} from 'helpers/useCustomForm'

const Login = ({signIn, action}) => {
    const router = useRouter()

    const initalValues = {
        email: '',
        password: '',
    }
    const initalValidates = {
        email: JOI.string().email({tlds: false}).required(),
        password: JOI.string().min(6).max(32).required()
    }
    const { 
        values, 
        errors, 
        touched, 
        handleBlur,
        handleChange, 
        handleSubmit 
    } = useCustomForm({initalValues, initalValidates, onEvent: value => onSubmit(value)}) 
    
    useEffect(()=>{
        if (signIn) {
            router.push('/')
        }
    },[signIn])
    const onSubmit = (values) =>{
        apiSignIn(values)
        .then((result:any) => {
            console.log(result)
            if(result.success){
                action.signIn()
            }
        }).catch((err) => {
            
        })
    }
    return (
        <div className="login-page">
            <div className="card-login">
                <div className="card-header">
                    <h3 className="card-title">Crawler systems</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form method='POST' onSubmit = {handleSubmit} noValidate>
                    <div className="card-body">
                        <div className="form-group flex-c">
                            <div className={`group-input ${errors.email ? 'line-error' : ''}`}>
                                <input type="text" name="email" className="form-control" onChange = {handleChange} value={values.email} onBlur={handleBlur} required/>
                                <label htmlFor="email">Email</label>
                                <span className={`form-line ${errors.email ? 'line-error' : ''}`}></span>
                            </div>
                            {errors.email ? <span className="error">{errors.email}</span> : null}
                        </div>
                        <div className="form-group flex-c">
                            <div className={`group-input ${errors.password ? 'line-error' : ''}`}>
                                <input type="password" name="password" className="form-control" onChange = {handleChange} value={values.password} onBlur={handleBlur} required/>
                                <label htmlFor="password">Password</label>
                                <span className={`form-line ${errors.password ? 'line-error' : ''}`}></span>
                            </div>
                            {errors.password ? <span className="error">{errors.password}</span> : null}
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators({signIn}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)