import React, {ChangeEventHandler, useEffect, useRef, useState} from 'react'

const useForm = ({initalValues, onEvent }) =>{
    const [values, setValues] = useState(initalValues || {})
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
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
        const { name } = target
        setTouched({...touched, [name]: true})
        console.log(touched)
    }
    const handleSubmit = (event: any) => {
        if (event) {
            event.preventDefault()
        }
        setErrors({...errors})
        onEvent({values, errors})
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

export default useForm