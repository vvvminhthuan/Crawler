import React, {useState} from 'react'
import RowItem from './RowItem'

interface field {
    name: string,
    key: string,
    className?: string,
    action?: any,
    html?: React.FC
}

type prop = {
    init?: {
        title?: string,
        description?: string,
        className?: string,
        columns: field[],
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
    let {title,description, className, columns} = init
    const [dataTree, setDataTree] = useState(data.roles)
    const [roleDefault, setRoleDefault] = useState(data.roleDefault)
    return (
        <div className="list-tree">
            {
                dataTree.map((item, index)=> {
                    return <RowItem key={index} dataRow={item}/>
                })
            }
        </div>
    )
}

export default ListTree