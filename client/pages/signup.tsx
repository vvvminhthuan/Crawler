import Link from 'next/link'

import { connect , useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux'
import { signIn } from 'redux/actions/SignIn'
import { getInfoUser } from 'redux/middleware/User'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { apiSignIn } from 'api/Auth'
import {useCustomForm, JOI} from 'helpers/useCustomForm'
import {setMessageErros} from 'helpers/common'

const SignUp = ({signIn, action}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isRendering, setIsRendering] = useState(false)
    const initalValues = {
        firstName: '',
        lastName: '',
        nickName: '',
        birthDate: '',
        gender: '',
        email: '',
        password: '',
        passwordConfirm: '',
        phoneNumber: '',
        numberId: '',
        address: '',
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
        handleSubmit,
        setErrorsByAttach
    } = useCustomForm({initalValues, initalValidates, onEvent: value => onSubmit(value)}) 
    
    useEffect(()=>{
        if (signIn) {
            router.push('/')
        }
        router.prefetch('/') 
        setIsRendering(true)
    },[signIn])
    const onSubmit = async (values) =>{
        let result = await apiSignIn(values)
        if(result.success){
            dispatch(getInfoUser())
        }else{
            let err = setMessageErros(result)
            setErrorsByAttach(err)
        }
    }
    if (!isRendering) {
        return null
    }
    return (
        <div className="signup-page">
            <div className="card-signup">
                {/* /.card-header */}
                <div className="card-header">
                    <h3 className="card-title">Sign up systems</h3>
                </div>
                {/* /.card-header */}
                {/* /.stepper-header */}
                <div className="stepper-header flex-r">
                    <div className="step active" data-trigger="sign-up">
                        <button className="step-trigger">
                            <span className="step-circle">1</span>
                            <span className="step-label">Sign up</span>
                        </button>
                    </div>
                    <div className="step-line"></div>
                    <div className="step" data-trigger="confirm">
                        <button className="step-trigger">
                            <span className="step-circle">2</span>
                            <span className="step-label">Confirm</span>
                        </button>
                    </div>
                    <div className="step-line"></div>
                    <div className="step" data-trigger="complete">
                        <button className="step-trigger">
                            <span className="step-circle">3</span>
                            <span className="step-label">Complete</span>
                        </button>
                    </div>
                </div>
                {/* /.stepper-header */}
                {/* form start */}
                <form method='POST' onSubmit = {handleSubmit} noValidate>
                    <div className="card-body">
                        {/* step sign up */}
                        <div id="sign-up" className="step step-signup">
                            <div className="form-group flex-c">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name="firstName" id="firstName" className="form-control" placeholder="Enter first name" onChange = {handleChange} value={values.firstName} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" name="lastName" id="lastName" className="form-control" placeholder="Enter last name" onChange = {handleChange} value={values.lastName} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="nickName">Nick Name</label>
                                <input type="text" name="nickName" id="nickName" className="form-control" placeholder="Enter nick name" onChange = {handleChange} value={values.nickName} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="birthDate">Birth Date</label>
                                <input type="text" name="birthDate" id="birthDate" className="form-control" placeholder="Birth date" onChange = {handleChange} value={values.birthDate} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="gender">Gender</label>
                                <input type="text" name="gender" id="gender" className="form-control" placeholder="Enter gender" onChange = {handleChange} value={values.gender} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="email">Email Address</label>
                                <input type="text" name="email" id="email" className="form-control" placeholder="Enter email" onChange = {handleChange} value={values.email} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className="form-control" placeholder="Password" onChange = {handleChange} value={values.password} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="passwordConfirm">Password Confirm</label>
                                <input type="password" name="passwordConfirm" id="passwordConfirm" className="form-control" placeholder="Password confirm" onChange = {handleChange} value={values.passwordConfirm} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="phoneNumber">Phone</label>
                                <input type="text" name="phoneNumber" id="phoneNumber" className="form-control" placeholder="Phone number" onChange = {handleChange} value={values.phoneNumber} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="numberId">Number ID</label>
                                <input type="text" name="numberId" id="numberId" className="form-control" placeholder="Number id" onChange = {handleChange} value={values.numberId} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="address">Address</label>
                                <input type="text" name="address" id="address" className="form-control" placeholder="Enter address" onChange = {handleChange} value={values.address} onBlur={handleBlur} />
                            </div>
                            <div className="form-action flex-r">
                                <button>Sign Up</button>
                            </div>
                        </div>
                        {/* step confirm */}
                        <div id="confirm" className="step step-confirm">
                            <div className="form-group flex-c">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name="firstName" id="firstName" className="form-control" onChange = {handleChange} value={values.firstName} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" name="lastName" id="lastName" className="form-control" onChange = {handleChange} value={values.lastName} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="nickName">Nick Name</label>
                                <input type="text" name="nickName" id="nickName" className="form-control" onChange = {handleChange} value={values.nickName} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="birthDate">Birth Date</label>
                                <input type="text" name="birthDate" id="birthDate" className="form-control" onChange = {handleChange} value={values.birthDate} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="gender">Gender</label>
                                <input type="text" name="gender" id="gender" className="form-control" onChange = {handleChange} value={values.gender} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="email">Email Address</label>
                                <input type="text" name="email" id="email" className="form-control" onChange = {handleChange} value={values.email} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className="form-control" onChange = {handleChange} value={values.password} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="passwordConfirm">Password Confirm</label>
                                <input type="password" name="passwordConfirm" id="passwordConfirm" className="form-control" onChange = {handleChange} value={values.passwordConfirm} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="phoneNumber">Phone</label>
                                <input type="text" name="phoneNumber" id="phoneNumber" className="form-control" onChange = {handleChange} value={values.phoneNumber} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="numberId">Number ID</label>
                                <input type="text" name="numberId" id="numberId" className="form-control" onChange = {handleChange} value={values.numberId} onBlur={handleBlur} />
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="address">Address</label>
                                <input type="text" name="address" id="address" className="form-control" onChange = {handleChange} value={values.address} onBlur={handleBlur} />
                            </div>
                            <div className="form-action flex-r">
                                <div className="group">
                                    <button className="btn-privice">Come Back</button>
                                    <button>Confirm</button>
                                </div>
                            </div>
                        </div>
                        {/* step complete */}
                        <div id="complete" className="step step-complete">
                            <div className="form-infomation">
                                <p>Sign up complete! Thanks you for trust us.</p>
                            </div>
                            <div className="form-action flex-r">
                                <Link href="/signup"><a className="link">Sign In</a></Link>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)