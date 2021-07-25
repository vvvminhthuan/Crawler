import React, {useEffect, useRef, useState} from 'react'
import Validator from './validates/ValidatorBasic'

const useCustomForm = ({initalValues, initalValidates, onEvent}) =>{
    const [values, setValues]: any  = useState(initalValues || {})
    const [errors, setErrors]: any = useState({})
    const [touched, setTouched]: any  = useState({})
    const [onSubmitting, setOnSubmitting] = useState<boolean>(false)
    const [onBlur, setOnBlur] = useState<boolean>(false)
   
    const formRef =  useRef<Array<HTMLInputElement>>(new Array())
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
            if (currentValidate) {
                let schemaCurrent = {[name]: currentValidate}
                let valueCurrent = {
                    [name]: value
                }
                let resultValidate = Validator.validate(valueCurrent, schemaCurrent)
                if (resultValidate.hasError) {
                    let errorCurrent = {
                        [name]: resultValidate.getError(name)
                    }
                    setErrors({...errors, ...errorCurrent})
                }else{
                    let errorCurrent = errors
                    delete errorCurrent[name]
                    setErrors({...errors, ...errorCurrent})
                }
            }
        }
    }
    const handleSubmit = (event: any) => {
        if (event) {
            event.preventDefault()
        }
        let resultValidate = Validator.validate(values,initalValidates)
        if (resultValidate.hasError) {
            let details = resultValidate.errors
            let arrList = Object.keys(details)
            setFocus(arrList[0])
            let listError = {}
            arrList.map((key) => {
                let mes = details[key]
                let errorCurrent = {
                    [key]: mes[0]
                }
                listError = {...listError, ...errorCurrent}
            })
            setErrors({...errors, ...listError})
        }else{
            onEvent({...values})
        }
    }
    const setErrorsByAttach = (obj: any) => {
        setErrors({...obj})
    }
    const setFocus = (inputName) =>{
        for (let index = 0; index < formRef.current.length; index++) {
            let element = formRef.current[index];
            if (!element) {
                continue
            }
            if (element.name == inputName) {
                element.focus()
                break
            }
        }
    }
    const createRef = (inputName: any):void => {
        if (formRef.current.length == 0) {
            formRef.current.push(inputName)
        }else {
            let isPush = true
            for (let index = 0; index < formRef.current.length; index++) {
                let element = formRef.current[index];
                if (!element) {
                    continue
                }
                if (element.name == inputName) {
                    console.log(element.name)
                    isPush = false
                    break
                }
            }
            if (isPush) {
                formRef.current.push(inputName)
            }
        }
    }
    const register = (inputName: string) => {
        return {
            onChange: handleChange,
            onBlur: handleBlur,
            value: values[inputName],
            ref: (inputName) => createRef(inputName),
            name: inputName,
        }
    }

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setErrorsByAttach,
        register
    }
}

export default useCustomForm