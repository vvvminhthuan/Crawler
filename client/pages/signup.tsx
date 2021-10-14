import Link from 'next/link'
import { useEffect } from 'react'
import { createUser } from 'api/Users'
import useCustomForm from 'helpers/useCustomForm'
import {setMessageErros} from 'helpers/common'
import {SiginUpValidates} from 'helpers/validates/Signup'
import {USER} from '../config/contants'
import FormStep from 'components/FormStep'
import Modals from 'components/Modals'

const SignUp = () => {

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
        privacyPolicy: ''
    }
    const initalValidates = SiginUpValidates
    
    const { 
        values, 
        errors, 
        touched, 
        handleSubmit,
        setErrorsByAttach,
        register
    } = useCustomForm({initalValues, initalValidates, onEvent: value => onSignIn(value)}) 
    
    useEffect(()=>{
    },[])
    const onSignIn = (value) =>{
        return true
    }

    const confirm =  async() =>{
        let value:any= {}
        Object.assign(value, values)
        delete value.privacyPolicy
        console.log(value)
        let result = await createUser(value)
        if (result.success) {
            return true
        } else {
            let err = setMessageErros(result)
            console.log(err)
            setErrorsByAttach(err)
            return false
        }
    }
    const signInStep = ['Sign Up', 'Confirm', 'Complete']
    const signInFooter = {
        step1: 'Sign Up',
        actionStep1: handleSubmit,
        step2: 'Confirm',
        actionStep2: confirm,
        turnBack: 'Come Back',
        complete: [
            <div key={1} className="form-infomation">
                <p>Sign up complete! Thanks you for trust us.</p>
            </div>,
            <div key={2} className="form-action flex-r">
                <Link href="/login"><a className="link">Sign In</a></Link>
            </div>
        ],
    }

    return (
        <>
        <FormStep title ='Sign up systems' initStep={signInStep} initFooter={signInFooter} classBody='sign-up'>
            <div className="form-group flex-c">
                <label htmlFor="firstName">First Name</label>
                <input type="text" {...register('firstName')} id="firstName" className={`form-control ${errors.firstName ? 'i-error' : ''}`} placeholder="Enter first name"/>
                {/* <input type="text" name="firstName" id="firstName" className={`form-control ${errors.firstName ? 'i-error' : ''}`} placeholder="Enter first name" onChange = {handleChange} value={values.firstName} onBlur={handleBlur}/> */}
                {errors.firstName ? <span className="error">{errors.firstName}</span> : null}
            </div>
            <div className="form-group flex-c">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" {...register('lastName')} id="lastName" className={`form-control ${errors.lastName ? 'i-error' : ''}`} placeholder="Enter last name"/>
                {errors.lastName ? <span className="error">{errors.lastName}</span> : null}
            </div>
            <div className="form-group flex-c">
                <label htmlFor="nickName">Nick Name</label>
                <input type="text" {...register('nickName')} id="nickName" className={`form-control ${errors.nickName ? 'i-error' : ''}`} placeholder="Enter nick name"/>
                {errors.nickName ? <span className="error">{errors.nickName}</span> : null}
            </div>
            <div className="form-group flex-c">
                <label htmlFor="birthDate">Birth Date</label>
                <input type="text" {...register('birthDate')} id="birthDate" className={`form-control ${errors.birthDate ? 'i-error' : ''}`} placeholder="Birth date(yyyy-mm-dd)"/>
                {errors.birthDate ? <span className="error">{errors.birthDate}</span> : null}
            </div>
            <div className="form-group flex-c">
                <label htmlFor="gender">Gender</label>
                <div className="flex-r">
                    <div className="group flex-r">
                        {/*  className='disabled' */}
                        <input type="radio" {...register('gender')} className='disabled' id="female" value={USER.GENDER.FEMALE}/>
                        <label htmlFor="female" className='disabled'>Female</label>
                    </div>
                    <div className="group flex-r">
                        {/*  className='disabled' */}
                        <input type="radio" {...register('gender')} className='disabled' id="male" value={USER.GENDER.MALE}/>
                        <label htmlFor="male" className='disabled'>Male</label>
                    </div>
                </div>
                {errors.gender ? <span className="error">{errors.gender}</span> : null}
            </div>
            <div className="form-group flex-c">
                <label htmlFor="email">Email Address</label>
                <input type="text" {...register('email')} id="email" className={`form-control ${errors.email ? 'i-error' : ''}`} placeholder="Enter email"/>
                {errors.email ? <span className="error">{errors.email}</span> : null}
            </div>
            <div className="form-group flex-c">
                <label htmlFor="password">Password</label>
                <input type="password" {...register('password')} id="password" className={`form-control ${errors.password ? 'i-error' : ''}`} placeholder="Password"/>
                {errors.password ? <span className="error">{errors.password}</span> : null}
            </div>
            <div className="form-group flex-c">
                <label htmlFor="passwordConfirm">Password Confirm</label>
                <input type="password" {...register('passwordConfirm')} id="passwordConfirm" className={`form-control ${errors.passwordConfirm ? 'i-error' : ''}`} placeholder="Password confirm"/>
                {errors.passwordConfirm ? <span className="error">{errors.passwordConfirm}</span> : null}
            </div>
            <div className="form-group flex-c">
                <label htmlFor="phoneNumber">Phone</label>
                <input type="text" {...register('phoneNumber')} id="phoneNumber" className={`form-control ${errors.phoneNumber ? 'i-error' : ''}`} placeholder="Phone number"/>
                {errors.phoneNumber ? <span className="error">{errors.phoneNumber}</span> : null}
            </div>
            <div className="form-group flex-c">
                <label htmlFor="numberId">Number ID</label>
                <input type="text" {...register('numberId')} id="numberId" className={`form-control ${errors.numberId ? 'i-error' : ''}`} placeholder="Number id"/>
                {errors.numberId ? <span className="error">{errors.numberId}</span> : null}
            </div>
            <div className="form-group flex-c">
                <label htmlFor="address">Address</label>
                <input type="text" {...register('address')} id="address" className={`form-control ${errors.address ? 'i-error' : ''}`} placeholder="Enter address"/>
                {errors.address ? <span className="error">{errors.address}</span> : null}
            </div>
            <div className="form-group flex-c">
                <div className="flex-r">
                    <input type="checkbox" {...register('privacyPolicy')} id='privacy-policy'className="privacy-policy" name="privacyPolicy"/>
                    <div className="lb-privacy-policy flex-r">
                        I agree to the Crawle
                        <a className="modal-service" data-modals="service">Terms Of Service</a>
                        and
                        <a className="modal-service" data-modals="policy">Privacy Policy</a>
                    </div>
                </div>
                {errors.privacyPolicy ? <span className="error">{errors.privacyPolicy}</span> : null}
            </div>
        </FormStep>
        <Modals title = 'Terms Of Service' modalsID = 'service'>
            <div>Terms Of Service</div>
        </Modals>
        <Modals title = 'Privacy Policy' modalsID = 'policy'>
            <div>Privacy Policy</div>
        </Modals>
        </>
    )
}

export default SignUp