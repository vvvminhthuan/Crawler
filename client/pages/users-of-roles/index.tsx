import {useEffect, useState} from 'react'

import Layout from 'components/Layouts'
import ListTree from 'components/ListTree'
import {getRolesTree} from 'api/Roles'
import Modals from 'components/Modals'

const UsersOfRoles = () => {
    const [rolers, setRoles] = useState(null)

    const rowShow = (e) =>{
        console.log('rowEdit ',e)
    }
    const rowUpdate = (e) =>{
        console.log('rowUpdate ', e)
    }
    const rowDelete = (e) =>{
        console.log('rowDelete ', e)
    }

    let init={
        titleName: 'name',
        childName: 'child',
        descName: 'description'
    }
    let option = {
        isView: false,
        rowEdit: {
            addNew: rowShow,
            update: rowUpdate,
            delete: rowDelete
        }
    }
    useEffect(() => {
        getRolesTree()
        .then((result) => {
            setRoles(result)
        })
    },[])
    return (
        <Layout title='Users of roles' description='Trang phan quyen nguoi dung'>
			<div className="page-role flex-c">
                <div className="role-header flex-r">
                    <div className="title">
                        <h2>Roles</h2>
                    </div>
                </div>
                <div className="role-containers flex-c">
                    <div className="list-role">
                        {rolers&&<ListTree init={init} option={option} data={rolers}/>}   
                    </div>
                </div>
            </div>
            <Modals title='Create New Role' modalsID='create_role'>

            </Modals>
		</Layout>
    )
}
  
export default UsersOfRoles