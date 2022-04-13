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
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event
        const { name, value } = target
        switch (target.type) {
            case 'checkbox':
                if (!value|| value == 'true'|| value == 'false') {
                    setValues({...values, [name]: target.checked})
                }else{
                    let listName = formRef.current.filter(i => i&&i?.name == name&&i.checked )
                    
                    let listValue = []
                    formRef.current.forEach(i => {
                        if (i&&i?.name == name&&i.checked) {
                            listValue.push(i.value) 
                        }
                    })
                    if (listName.length == 1) {
                        setValues({...values, [name]: value})
                    } else {
                        setValues({...values, [name]: listValue})
                    }
                }
                break;
            case 'radio':
                if (!value|| value == 'true'|| value == 'false') {
                    setValues({...values, [name]: target.checked})
                }else{
                    setValues({...values, [name]: value})
                }
                break;
            default:
                setValues({...values, [name]: value})
                break;
        }
    }
    const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event
        const { name, value } = target
        let valueCurrent = null
        switch (target.type) {
            case 'checkbox':
                if (!value|| value == 'true'|| value == 'false') {
                    valueCurrent = {
                        [name]: target.checked
                    }
                }else{
                    if (target.checked) {
                        valueCurrent = {
                            [name]: value
                        }
                    }else{
                        valueCurrent = {
                            [name]: undefined
                        }
                    }
                }
                break;
            case 'radio':
                if (!value|| value == 'true'|| value == 'false') {
                    valueCurrent = {
                        [name]: target.checked
                    }
                }else{
                    if (target.checked) {
                        valueCurrent = {
                            [name]: value
                        }
                    }else{
                        valueCurrent = {
                            [name]: undefined
                        }
                    }
                }
                break;
            default:
                valueCurrent = {
                    [name]: value
                }
                break;
        }

        setTouched({...touched, [name]: true})
        
        if (initalValidates[name]) {
            let currentValidate = initalValidates[name]
            if (currentValidate) {
                let schemaCurrent = {[name]: currentValidate}
                
                let valid = Validator.validate(schemaCurrent, valueCurrent)
                if (valid.hasError) {
                    let errorCurrent = {
                        [name]: valid.errors[name]
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
        let valid = Validator.validate(initalValidates, values)
        if (valid.hasError) {
            let details = valid.errors
            let arrList = Object.keys(details)
            setFocus(arrList[0])
            let listError = {}
            arrList.map((key) => {
                let mes = details[key]
                let errorCurrent = {
                    [key]: mes
                }
                listError = {...listError, ...errorCurrent}
            })
            setErrors({...errors, ...listError})
        }else{
            setErrors({})
            let rs = onEvent({...values})
            if (rs) {
                return rs
            }
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
        let checkExists = formRef.current.some(i=>(i?.name==inputName||i==inputName))
        if (!checkExists) {
            formRef.current.push(inputName)
        }
        // if (formRef.current.length == 0) {
        //     formRef.current.push(inputName)
        // }else {
        //     let isPush = true
        //     for (let index = 0; index < formRef.current.length; index++) {
        //         let element = formRef.current[index];
        //         if (!element) {
        //             continue
        //         }
        //         if (element.name == inputName) {
        //             isPush = false
        //             break
        //         }
        //     }
        //     if (isPush) {
        //         formRef.current.push(inputName)
        //         console.log('NO GOI LIEN TUC THANG NAYS', formRef.current)
        //     }
        // }
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