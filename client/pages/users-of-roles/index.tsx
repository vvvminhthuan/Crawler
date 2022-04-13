import {useEffect, useState} from 'react'
import Link from 'next/link'
import Layout from 'components/Layouts'
import ListTree from 'components/ListTree'
import {getRolesTree} from 'api/Roles'
import Modals from 'components/Modals'
import FormStep from 'components/FormStep'
import useCustomForm from 'helpers/useCustomForm'
import {setMessageErros} from 'helpers/common'
import {initalValidates} from 'helpers/validates/RolesValidate'

const UsersOfRoles = () => {
    const [rolers, setRoles] = useState(null)
    const [modalShow, setModalShow] = useState(false)
    const [titleForm, setTitleForm] = useState('')
    const [stepName, setStepName] = useState('')

    const rowAddChild = (e) =>{
        setTitleForm('Create New Role')
        setStepName('Create')
        setModalShow(true)
        console.log('rowEdit ',e)
    }
    const rowUpdate = (e) =>{
        setTitleForm('Edit Role')
        setStepName('Edit')
        setModalShow(true)
        console.log('rowUpdate ', e)
    }
    const rowDelete = (e) =>{
        console.log('rowDelete ', e)
    }

    let initListTree={
        titleName: 'name',
        childName: 'child',
        descName: 'description',
        classBody: 'modal-role'
    }
    let option = {
        isView: false,
        rowEdit: {
            addNew: rowAddChild,
            update: rowUpdate,
            delete: rowDelete
        }
    }

    const initalValues = {
        name: '',
        parentId: '',
        roleDefault: null
    }
    /**
     * Submit va kiem tra validate
     * @param value value sau khi validate thanh cong
     */
    const onSubmit = (value) => {
        console.log(value)
    }
    /**
     * Thực hiện save or update sau khi validate thanh cong
     */
    const confirm = () => {
        console.log(values)
    }
    const { 
        values, 
        errors, 
        touched, 
        handleSubmit,
        setErrorsByAttach,
        register
    } = useCustomForm({initalValues, initalValidates, onEvent: value => onSubmit(value)})

    const signInStep = [stepName, 'Confirm', 'Complete']
    const signInFooter = {
        step1: 'Save',
        actionStep1: handleSubmit,
        step2: 'Confirm',
        actionStep2: confirm,
        turnBack: 'Come Back',
        complete: [
            <div key={1} className="form-infomation">
                <p>{`${stepName} complete! Thanks you for trust us.`}</p>
            </div>,
            <div key={2} className="form-action flex-r">
                <a className="link" onClick={()=>setModalShow(false)}>Close</a>
            </div>
        ],
    }

    useEffect(() => {
        getRolesTree()
        .then((result) => {
            setRoles(result)
        })
    },[])

    return (
        <Layout title="Roles for system" description='Roles for system'>
			<div className="page-role flex-c">
                <div className="role-header flex-r">
                    <div className="title">
                        <h2>Roles</h2>
                    </div>
                </div>
                <div className="role-containers flex-c">
                    <div className="list-role">
                        {rolers&&<ListTree init={initListTree} option={option} data={rolers.roles}/>}   
                    </div>
                </div>
            </div>
            <Modals title={titleForm} show={modalShow} onHide={setModalShow}>
                <FormStep title='' initStep={signInStep} initFooter={signInFooter} classBody='form-role'>
                    <div className="form-group flex-c">
                        <label htmlFor="roleName">Role Name</label>
                        <input type="text" {...register('name')} id="roleName" className={`form-control ${errors.name ? 'i-error' : ''}`} placeholder="Enter role name"/>
                        {errors.name ? <span className="error">{errors.name}</span> : null}
                    </div>
                    <div className="form-group flex-c">
                        <label htmlFor="roleParent">Role Parent</label>
                        <input type="text" {...register('parentId')} id="roleParent" className={`form-control ${errors.parentId ? 'i-error' : ''}`} placeholder="Enter parent name"/>
                        {errors.parentId ? <span className="error">{errors.parentId}</span> : null}
                    </div>
                    <div className="form-group flex-c">
                        <label htmlFor="roleParent">Roles basic</label>
                        <div className="group flex-r">
                            {
                                rolers&&rolers.roleDefault.map((i, e )=> {
                                    return (
                                        <label className='checkbox flex-r' htmlFor={i.id}  key={e}>
                                            <input type="checkbox" {...register('roleDefault')} value={i.id} id={i.id}/>
                                            {i.name}
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </div>
                </FormStep>
            </Modals>
		</Layout>
    )
}
  
export default UsersOfRoles