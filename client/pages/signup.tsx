import Link from 'next/link'

import { connect , useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux'
import { signIn } from 'redux/actions/SignIn'
import { getInfoUser } from 'redux/middleware/User'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { apiSignIn } from 'api/Auth'
import useCustomForm from 'helpers/useCustomForm'
import {setMessageErros} from 'helpers/common'
import {SiginUpValidates} from 'helpers/validates/signup'
import {USER} from '../config/contants'

const SignUp = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [step, setStep] = useState(1)
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
    const initalValidates = SiginUpValidates
    
    const { 
        values, 
        errors, 
        touched, 
        handleBlur,
        handleChange, 
        handleSubmit,
        setErrorsByAttach,
        register
    } = useCustomForm({initalValues, initalValidates, onEvent: value => onSignIn(value)}) 
    
    useEffect(()=>{
        
    },[])

    const onSignIn = (values) =>{
        setStep(2)
        console.log(values)
    }

    const onConfirm = () =>{
        console.log(values)
        setStep(3)
    }

    const onBack = () =>{
        setStep(1)
        console.log(step)
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
                <div className="form">
                    <div className="card-body">
                        {/* step sign up */}
                        <div className={`step step-signup ${step > 2 ? 'hidden' : ''}`}>
                            <div className="form-group flex-c">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" {...register('firstName')} id="firstName" className={`form-control ${errors.firstName ? 'i-error' : ''}`} placeholder="Enter first name" disabled={(step>1)}/>
                                {/* <input type="text" name="firstName" id="firstName" className={`form-control ${errors.firstName ? 'i-error' : ''}`} placeholder="Enter first name" onChange = {handleChange} value={values.firstName} onBlur={handleBlur} disabled={(step>1)}/> */}
                                {errors.firstName ? <span className="error">{errors.firstName}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" {...register('lastName')} id="lastName" className={`form-control ${errors.lastName ? 'i-error' : ''}`} placeholder="Enter last name" disabled={(step>1)}/>
                                {errors.lastName ? <span className="error">{errors.lastName}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="nickName">Nick Name</label>
                                <input type="text" {...register('nickName')} id="nickName" className={`form-control ${errors.nickName ? 'i-error' : ''}`} placeholder="Enter nick name" disabled={(step>1)}/>
                                {errors.nickName ? <span className="error">{errors.nickName}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="birthDate">Birth Date</label>
                                <input type="text" {...register('birthDate')} id="birthDate" className={`form-control ${errors.birthDate ? 'i-error' : ''}`} placeholder="Birth date(yyyy-mm-dd)" disabled={(step>1)}/>
                                {errors.birthDate ? <span className="error">{errors.birthDate}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="gender">Gender</label>
                                <div className="flex-r">
                                    <div className="group flex-r">
                                        <input type="radio" {...register('gender')} id="female" className={`form-control ${(step>1) ? 'disabled' : ''}`} value={USER.GENDER.FEMALE}/>
                                        <label htmlFor="female" className={`${(step>1) ? 'disabled' : ''}`}>Female</label>
                                    </div>
                                    <div className="group flex-r">
                                        <input type="radio" {...register('gender')} id="male" className={`form-control ${(step>1) ? 'disabled' : ''}`} value={USER.GENDER.MALE}/>
                                        <label htmlFor="male" className={`${(step>1) ? 'disabled' : ''}`}>Male</label>
                                    </div>
                                </div>
                                {errors.gender ? <span className="error">{errors.gender}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="email">Email Address</label>
                                <input type="text" {...register('email')} id="email" className={`form-control ${errors.email ? 'i-error' : ''}`} placeholder="Enter email" disabled={(step>1)}/>
                                {errors.email ? <span className="error">{errors.email}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="password">Password</label>
                                <input type="password" {...register('password')} id="password" className={`form-control ${errors.password ? 'i-error' : ''}`} placeholder="Password" disabled={(step>1)}/>
                                {errors.password ? <span className="error">{errors.password}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="passwordConfirm">Password Confirm</label>
                                <input type="password" {...register('passwordConfirm')} id="passwordConfirm" className={`form-control ${errors.passwordConfirm ? 'i-error' : ''}`} placeholder="Password confirm" disabled={(step>1)}/>
                                {errors.passwordConfirm ? <span className="error">{errors.passwordConfirm}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="phoneNumber">Phone</label>
                                <input type="text" {...register('phoneNumber')} id="phoneNumber" className={`form-control ${errors.phoneNumber ? 'i-error' : ''}`} placeholder="Phone number" disabled={(step>1)}/>
                                {errors.phoneNumber ? <span className="error">{errors.phoneNumber}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="numberId">Number ID</label>
                                <input type="text" {...register('numberId')} id="numberId" className={`form-control ${errors.numberId ? 'i-error' : ''}`} placeholder="Number id" disabled={(step>1)}/>
                                {errors.numberId ? <span className="error">{errors.numberId}</span> : null}
                            </div>
                            <div className="form-group flex-c">
                                <label htmlFor="address">Address</label>
                                <input type="text" {...register('address')} id="address" className={`form-control ${errors.address ? 'i-error' : ''}`} placeholder="Enter address" disabled={(step>1)}/>
                                {errors.address ? <span className="error">{errors.address}</span> : null}
                            </div>
                            <div className={`form-action flex-r ${step != 1 ? 'hidden' : ''}`} data-submit="sign-up">
                                <button onClick={handleSubmit}>Sign Up</button>
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
                </div>
            </div>
        </div>
    )
}

export default SignUp