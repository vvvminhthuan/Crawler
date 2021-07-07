import React, {useEffect, useRef, useState} from 'react'
import joi from 'joi'

export const useCustomForm = ({initalValues, initalValidates, onEvent}) =>{
    const [values, setValues]: any  = useState(initalValues || {})
    const [errors, setErrors]: any = useState({})
    const [touched, setTouched]: any  = useState({})
    const [onSubmitting, setOnSubmitting] = useState<boolean>(false)
    const [onBlur, setOnBlur] = useState<boolean>(false)
   
    
    const formRendered = useRef(true)

    useEffect(() =>{
        if (formRendered.current) {
            setValues(initalValues)
            setErrors({})
            setTouched({})
            setOnSubmitting(false)
            setOnBlur(false)
        }
        formRendered.current = false
    }, [initalValues])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event
        const { name, value } = target
        setValues({...values, [name]: value})
    }
    const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event
        const { name, value } = target
        setTouched({...touched, [name]: true})
        if (initalValidates[name]) {
            let currentValidate = initalValidates[name]
            let schemaCurrent = joi.object({[name]: currentValidate})
            let valueCurrent = {
                [name]: value
            }
            let valueValidate = schemaCurrent.validate(valueCurrent)
            if (valueValidate.error) {
                let errorCurrent = {
                    [name]: valueValidate.error.message.replaceAll('\"','')
                }
                setErrors({...errors, ...errorCurrent})
            }else{
                let errorCurrent = errors
                delete errorCurrent[name]
                setErrors({...errors, ...errorCurrent})
            }
        }
    }
    const handleSubmit = (event: any) => {
        if (event) {
            event.preventDefault()
        }
        const schema = joi.object(initalValidates)
        const valueValidate: any = schema.validate(values,{
            abortEarly: false,
        })
        if (valueValidate.error) {
            let {details} = valueValidate.error
            let listError = {}
            details.map(item => {
                let errorCurrent = {
                    [item.path[0]]: item.message.replaceAll('\"','')
                }
                listError = {...listError, ...errorCurrent}
            })
            setErrors({...errors, ...listError})
        }else{
            onEvent({...values})
        }
    }

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
    }
}

export const JOI = joi