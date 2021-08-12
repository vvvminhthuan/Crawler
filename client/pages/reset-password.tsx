import Link from 'next/link'

import { useEffect, useState } from 'react'

import useCustomForm from 'helpers/useCustomForm'
import {setMessageErros} from 'helpers/common'

import FormStep from 'componets/FormStep'

const ResetPassword = () => {
    const initalValues = {
        email: ''
    }
    const initalValidates = {
        email: 'required|string|maxLength:255|email'
    }
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
    const onSignIn = (value) =>{
        return true
    }
    const confirm = async () =>{
        return true
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
                <p>Password reset complete! Thanks you for trust us.</p>
            </div>,
            <div key={2} className="form-action flex-r">
                <Link href="/login"><a className="link">Sign In</a></Link>
            </div>
        ],
    }
    return (
        <FormStep title ='For got email systems' initStep={signInStep} initFooter={signInFooter} classBody='sign-up'>
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
        </FormStep>
    )
}

export default ResetPassword