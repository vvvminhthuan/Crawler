import React, {useState} from 'react'
import RowItem from './RowItem'

type prop = {
    init?: {
        className?: string,
        titleName: string,
        childName: string,
        descName?: string,
        dataModal?: string
    },
    data?: any,
    option?: {
        isView?: boolean,
        rowEdit?: {
            addNew: any,
            update: any,
            delete: any
        }
    }
}

const ListTree: React.FC<prop> = ({init, data, option}) => {
    let {isView, rowEdit} = option
    let {className, titleName, childName, descName, dataModal} = init
    const [dataTree, setDataTree] = useState(data.roles)
    const [roleDefault, setRoleDefault] = useState(data.roleDefault)
    return (
        <>
            <div className={`list-tree ${className??''}`}>
                {
                    dataTree.map((item, index)=> {
                        return <RowItem key={index} dataRow={item} titleName={titleName} childName={childName} descName={descName} isView={isView} rowEdit={rowEdit} lever={0}/>
                    })
                }
                <div className="default-action flex-r">
                    <button className="action-add" onClick={(e) => rowEdit.addNew(e)}>Add New Role</button>
                </div>
            </div>
        </>
    )
}

export default ListTree