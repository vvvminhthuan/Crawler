import React, {useEffect, useRef, useState} from 'react'
import Validator from './validates/ValidatorBasic'
/**
 * @param initalValues Toan bo field cua form truyen vao va dat gia tri mac dinh
 * @param initalValidates Toan bo field cua form truyen vao can validate
 * @param onEvent Su kien khi form submit se duoc truyen vao de su ly
 * @returns Tra ve func va values loi cua form values, errors, touched, handleChange, handleBlur, handleSubmit, setErrorsByAttach, register
 */
const useCustomForm = ({initalValues, initalValidates, onEvent}) =>{
    const [values, setValuesForm]: any  = useState(initalValues || {})
    const [errors, setErrors]: any = useState({})
    const [touched, setTouched]: any  = useState({})
    const [onSubmitting, setOnSubmitting] = useState<boolean>(false)
    const [onBlur, setOnBlur] = useState<boolean>(false)
   
    const formRef =  useRef<Array<HTMLInputElement>>(new Array())
    const formRendered = useRef(true)

    useEffect(() =>{
        if (formRendered.current) {
            setValuesForm(initalValues)
            setErrors({})
            setTouched({})
            setOnSubmitting(false)
            setOnBlur(false)
        }
        formRendered.current = false
    }, [])
    /**
     * Su kien cua input thay doi
     * @param event Event cua Input HTMLInputElement
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event
        const { name, value } = target
       
        switch (target.type) {
            case 'checkbox':
                if (!value|| value == 'true'|| value == 'false') {
                    setValuesForm({...values, [name]: target.checked})
                }else{
                    setValuesForm({...values, [name]: getMultiValue(name, value)})
                }
                break;
            case 'radio':
                if (!value|| value == 'true'|| value == 'false') {
                    setValuesForm({...values, [name]: target.checked})
                }else{
                    setValuesForm({...values, [name]: getMultiValue(name, value)})
                }
                break;
            default:
                setValuesForm({...values, [name]: getMultiValue(name, value)})
                break;
        }
    }
    /**
     * Sau khi con tro roi di thi lay gia tri(Thoat khoi fucus)
     * @param event Event cua Input hien tai
     */
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
                            [name]: getMultiValue(name, value)
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
                            [name]: getMultiValue(name, value)
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
                    [name]: getMultiValue(name, value)
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
    /**
     * Submit va kiem tra tinh dung cua form
     * @param event Event cua form componet
     * @returns Trả về lỗi hoặc giá trị đúng cua form
     */
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
    /**
     * dat lai thong bao loi cho form khi co loi tu ben ngoai, khong phai tu form validate, co the tu api
     * @param obj object loi duoc tra ve boi ben ngoai 
     */
    const setErrorsByAttach = (obj: any) => {
        setErrors({...obj})
    }
    /**
     * Focus den ngay control(input) dau tien dang duoc truyen vao
     * @param inputName Name cua Input
     */
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
    /**
     * Khoi tao ref lien ket voi DOM input, ho tro qua trinh focus khi validate loi, cung cac su kien khac
     * Khoi tao luon checked mac dinh cho input voi kieu la radio va checkbox voi value dau vao tuong ung
     * @param inputName Name cua Input 
     */
    const createRef = (inputName: any):void => {
        if (inputName!= null) {
            let checkExists = formRef.current.some(i=>(i?.name==inputName||i==inputName))
            if (!checkExists) {
                formRef.current.push(inputName)
            }
        }
        formRef.current.forEach(item => {
            if(item == inputName && (item.type=='checkbox' || item.type == 'radio')){
                if (typeof values[item.name] == "string") {
                    item.checked = values[item.name] == item.value
                } else {
                    item.checked = values[item.name].some(s=>s==item.value)
                }
            }
        })
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
    /**
     * Khoi tao va tra ve cac su kien, value, ref can thien cho mot input
     * @param inputName Name cua Input 
     * @returns Tra ve cac su kien, value, ref can thien cho mot input
     */
    const register = (inputName: string) => {
        return {
            onChange: handleChange,
            onBlur: handleBlur,
            value: values[inputName],
            ref: (inputName) => createRef(inputName),
            name: inputName,       
        }
    }
    /**
     * tra ve gia tri hien tai cua input dang thay doi
     * @param name input dang thay doi
     * @param value gia tri hien tai cua input dang thay doi
     * @returns neu input[name="{name}"] la 1 or 0 thi tra ve chinh value do nguoc lai tra ve mang gia tri cua input[name="name"]
     */
    const getMultiValue = (name, value) => {
        let listValue = []
        formRef.current.forEach(i => {
            if (i&&i?.name==name&&i.checked) {
                listValue.push(i.value)
            }
        })
        return listValue.length <= 1 ? value: listValue
    }

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setErrorsByAttach,
        register,
        setValuesForm
    }
}

export default useCustomForm