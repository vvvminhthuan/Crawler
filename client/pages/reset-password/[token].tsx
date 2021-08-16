import Link from 'next/link'

import { useEffect } from 'react'
import { restPassword } from 'api/Users'
import useCustomForm from 'helpers/useCustomForm'
import {setMessageErros} from 'helpers/common'

import FormStep from 'componets/FormStep'
import { useRouter } from 'next/router'

const ResetPassword = () => {
    const router = useRouter()
    const param = router.query
    const initalValues = {
        password: '',
        passwordConfirm: '',
    }
    const initalValidates = {
        password: 'required|string|minLength:6',
        passwordConfirm: {
            required: true,
            string: true,
            pwConfirm: (value) => {
                let password:any = document.getElementsByName('password')
                if (value == password[0].value) {
                    return true
                }
                return false
            }
        },
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
        let result = await restPassword(values, param.token)
        if (result.success) {
            return true
        } else {
            let err = setMessageErros(result)
            setErrorsByAttach(err)
            return false
        }
    }
    const signInStep = ['Reset your password', 'Password confirm', 'Complete']
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