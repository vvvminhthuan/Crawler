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

import contants from 'config/contants'

const SignUp = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [step, setStep] = useState(1)
    const initalValues = {
        firstName: '',
        lastName: '',
        nickName: '',
        birthDate: '',
        gender: 0,
        email: '',
        password: '',
        passwordConfirm: '',
        phoneNumber: '',
        numberId: '',
        address: '',
    }
    const initalValidates = {
        firstName: JOI.string().min(1).max(250).required(),
        lastName: JOI.string().min(1).max(250).required(),
        nickName: JOI.string().min(1).max(250).required(),
        birthDate: JOI.date().iso(),
        gender: JOI.number().required(),
        email: JOI.string().email({tlds: false}).required(),
        password: JOI.string().min(6).max(32).required(),
        passwordConfirm: JOI.ref('password'),
        phoneNumber: JOI.number().min(10).max(12),
        numberId: JOI.number().min(9).max(12),
        address: JOI.string().required().min(1).max(250),
    }
    const { 
        values, 
        errors, 
        touched, 
        handleBlur,
        handleChange, 
        handleSubmit,
        setErrorsByAttach
    } = useCustomForm({initalValues, initalValidates, onEvent: value => onSignIn(value)}) 
    
    useEffect(()=>{
    },[])

    const onSignIn = (values) =>{
        console.log(values)
        setStep(step+1)
    }

    const onConfirm = () =>{
        console.log(values)
        setStep(step+1)
    }

    const onBack = () =>{
        setStep(step-1)
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
                    <div className={`step ${(step==1) ? 'active' : ''}`} data-trigger="sign-up">
                        <button className="step-trigger">
                            <span className="step-circle">1</span>
                            <span className="step-label">Sign up</span>
                        </button>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${(step==2) ? 'active' : ''}`} data-trigger="confirm">
                        <button className="step-trigger">
                            <span className="step-circle">2</span>
                            <span className="step-label">Confirm</span>
                        </button>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${(step==3) ? 'active' : ''}`} data-trigger="complete">
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
                        <div className={`step step-signup ${step > 2 ? 'hidden' : ''}`}>
                            <div className="form-group flex-c">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name="firstName" id="firstName" className={`form-control ${errors.firstName ? 'i-error' : ''}`} placeholder="Enter first name" onChange = {handleChange} value={values.firstName} onBlur={handleBlur} disabled={(step>1)}/>
                                {errors.firstName ? <span className="error">{errors.firstName}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" name="lastName" id="lastName" className={`form-control ${errors.lastName ? 'i-error' : ''}`} placeholder="Enter last name" onChange = {handleChange} value={values.lastName} onBlur={handleBlur} disabled={(step>1)}/>
                                {errors.lastName ? <span className="error">{errors.lastName}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="nickName">Nick Name</label>
                                <input type="text" name="nickName" id="nickName" className={`form-control ${errors.nickName ? 'i-error' : ''}`} placeholder="Enter nick name" onChange = {handleChange} value={values.nickName} onBlur={handleBlur} disabled={(step>1)}/>
                                {errors.nickName ? <span className="error">{errors.nickName}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="birthDate">Birth Date</label>
                                <input type="text" name="" id="birthDate" className={`form-control ${errors.birthDate ? 'i-error' : ''}`} placeholder="Birth date(yyyy-mm-dd)" onChange = {handleChange} value={values.birthDate} onBlur={handleBlur} disabled={(step>1)}/>
                                {errors.birthDate ? <span className="error">{errors.birthDate}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="gender">Gender</label>
                                <div className="flex-r">
                                    <div className="group flex-r">
                                        <input type="radio" name="gender" id="female" className={`form-control ${(step>1) ? 'disabled' : ''}`} onChange = {handleChange} value={contants.USER.GENDER.FEMALE} onBlur={handleBlur} checked/>
                                        <label htmlFor="female" className={`${(step>1) ? 'disabled' : ''}`}>Female</label>
                                    </div>
                                    <div className="group flex-r">
                                        <input type="radio" name="gender" id="male" className={`form-control ${(step>1) ? 'disabled' : ''}`} onChange = {handleChange} value={contants.USER.GENDER.MALE} onBlur={handleBlur} />
                                        <label htmlFor="male" className={`${(step>1) ? 'disabled' : ''}`}>Male</label>
                                    </div>
                                </div>
                                {errors.gender ? <span className="error">{errors.gender}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="email">Email Address</label>
                                <input type="text" name="email" id="email" className={`form-control ${errors.email ? 'i-error' : ''}`} placeholder="Enter email" onChange = {handleChange} value={values.email} onBlur={handleBlur} disabled={(step>1)}/>
                                {errors.email ? <span className="error">{errors.email}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className={`form-control ${errors.password ? 'i-error' : ''}`} placeholder="Password" onChange = {handleChange} value={values.password} onBlur={handleBlur} disabled={(step>1)}/>
                                {errors.password ? <span className="error">{errors.password}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="passwordConfirm">Password Confirm</label>
                                <input type="password" name="passwordConfirm" id="passwordConfirm" className={`form-control ${errors.passwordConfirm ? 'i-error' : ''}`} placeholder="Password confirm" onChange = {handleChange} value={values.passwordConfirm} onBlur={handleBlur} disabled={(step>1)}/>
                                {errors.passwordConfirm ? <span className="error">{errors.passwordConfirm}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="phoneNumber">Phone</label>
                                <input type="text" name="phoneNumber" id="phoneNumber" className={`form-control ${errors.phoneNumber ? 'i-error' : ''}`} placeholder="Phone number" onChange = {handleChange} value={values.phoneNumber} onBlur={handleBlur} disabled={(step>1)}/>
                                {errors.phoneNumber ? <span className="error">{errors.phoneNumber}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="numberId">Number ID</label>
                                <input type="text" name="numberId" id="numberId" className={`form-control ${errors.numberId ? 'i-error' : ''}`} placeholder="Number id" onChange = {handleChange} value={values.numberId} onBlur={handleBlur} disabled={(step>1)}/>
                                {errors.numberId ? <span className="error">{errors.numberId}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="address">Address</label>
                                <input type="text" name="address" id="address" className={`form-control ${errors.address ? 'i-error' : ''}`} placeholder="Enter address" onChange = {handleChange} value={values.address} onBlur={handleBlur} disabled={(step>1)}/>
                                {errors.address ? <span className="error">{errors.address}</span> : null}
                            </div>
                            <div className={`form-action flex-r ${step != 1 ? 'hidden' : ''}`} data-submit="sign-up">
                                <button type="submit" >Sign Up</button>
                            </div>
                            {/* step confirm */}
                            <div className={`form-action flex-r ${step != 2 ? 'hidden' : ''}`} data-submit="confirm">
                                <div className="group">
                                    <button className="btn-privice" onClick={onBack}>Come Back</button>
                                    <button onClick={onConfirm}>Confirm</button>
                                </div>
                            </div>
                        </div>
                        {/* step complete */}
                        <div id="complete" className={`step step-complete ${step != 3 ? 'hidden' : ''}`} >
                            <div className="form-infomation">
                                <p>Sign up complete! Thanks you for trust us.</p>
                            </div>
                            <div className="form-action flex-r">
                                <Link href="/login"><a className="link">Sign In</a></Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp