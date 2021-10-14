import Link from 'next/link'

import { useEffect } from 'react'
import { mailRestPassword } from 'api/Users'
import useCustomForm from 'helpers/useCustomForm'
import {setMessageErros} from 'helpers/common'

import FormStep from 'components/FormStep'

const ForGot = () => {
    const initalValues = {
        email: ''
    }
    const initalValidates = {
        email: 'required|string|maxLength:255|email'
    }
    const { 
        values, 
        errors, 
        handleSubmit,
        setErrorsByAttach,
        register
    } = useCustomForm({initalValues, initalValidates, onEvent: value => onSignIn(value)}) 
    useEffect(()=>{
    },[])
    const onSignIn = (value) =>{
        return true
    }
    const confirm = async () =>{
        let result = await mailRestPassword(values)
        if (result.success) {
            return true
        } else {
            let err = setMessageErros(result)
            setErrorsByAttach(err)
            return false
        }
    }
    const signInStep = ['Find your email', 'Email confirm', 'Complete']
    const signInFooter = {
        step1: 'Next',
        actionStep1: handleSubmit,
        step2: 'Confirm',
        actionStep2: confirm,
        turnBack: 'Come Back',
        complete: [
            <div key={1} className="form-infomation">
                <p>We are send link reset password into your email, please check it! Thanks you for trust us.</p>
            </div>,
            <div key={2} className="form-action flex-r">
                <Link href="/login"><a className="link">Sign In</a></Link>
            </div>
        ],
    }
    return (
        <FormStep title ='For got email systems' initStep={signInStep} initFooter={signInFooter} classBody='sign-up'>
            <div className="form-group flex-c">
                <label htmlFor="email">Email Address</label>
                <input type="text" {...register('email')} id="email" className={`form-control ${errors.email ? 'i-error' : ''}`} placeholder="Enter email"/>
                {errors.email ? <span className="error">{errors.email}</span> : null}
            </div>
        </FormStep>
    )
}

export default ForGot