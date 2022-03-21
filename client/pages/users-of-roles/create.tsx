import React from 'react'
import Link from 'next/link'
import Layouts from 'components/Layouts'
import FormStep from 'components/FormStep'
import useCustomForm from 'helpers/useCustomForm'
import RolesValidate from 'helpers/validates/RolesValidate';

const create = () => {
    const initalValues = {
        parentId: '',
        name: '',
        createdBy: '1'
    }
    const initalValidates = RolesValidate
    
    const { 
        values, 
        errors, 
        touched, 
        handleSubmit,
        setErrorsByAttach,
        register
    } = useCustomForm({initalValues, initalValidates, onEvent: value => onCreate(value)}) 
   
    const onCreate = (value) =>{
        return true
    }

    const confirm =  async() =>{
        let value:any= {}
        Object.assign(value, values)
        console.log(value)
        // let result = await createUser(value)
        // if (result.success) {
        //     return true
        // } else {
        //     let err = setMessageErros(result)
        //     setErrorsByAttach(err)
        //     return false
        // }
    }
    const createStep = ['Roles Create', 'Confirm', 'Complete']
    const createFooter = {
        step1: 'Create',
        actionStep1: handleSubmit,
        step2: 'Confirm',
        actionStep2: confirm,
        turnBack: 'Come Back',
        complete: [
            <div key={1} className="form-infomation">
                <p>Sign up complete! Thanks you for trust us.</p>
            </div>,
            <div key={2} className="form-action flex-r">
                <Link href="/users-of-roles"><a className="link">Roles list</a></Link>
            </div>
        ],
    }
    return (
        <Layouts title='Create Roles' description='create roles system'>
            <FormStep title='Roles create' initFooter={createFooter} initStep={createStep} classBody='roler-create'>
                <div className="form-group flex-c">
                    <label htmlFor="firstName">Role Name</label>
                    <input type="text" {...register('name')} id="name" className={`form-control ${errors.name ? 'i-error' : ''}`} placeholder="Enter role name"/>
                    {/* <input type="text" name="firstName" id="firstName" className={`form-control ${errors.firstName ? 'i-error' : ''}`} placeholder="Enter first name" onChange = {handleChange} value={values.firstName} onBlur={handleBlur}/> */}
                    {errors.name ? <span className="error">{errors.name}</span> : null}
                </div>
                <div className="form-group flex-c">
                    <label htmlFor="firstName">Group parent</label>
                    <input type="text" {...register('parentId')} id="parentId" className={`form-control ${errors.parentId ? 'i-error' : ''}`} placeholder="Enter role name"/>
                    {/* <input type="text" name="firstName" id="firstName" className={`form-control ${errors.firstName ? 'i-error' : ''}`} placeholder="Enter first name" onChange = {handleChange} value={values.firstName} onBlur={handleBlur}/> */}
                    {errors.parentId ? <span className="error">{errors.parentId}</span> : null}
                </div>
            </FormStep>
        </Layouts>
    )
}

export default create