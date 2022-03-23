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
        colNames: field[],
    },
    data?: any[],
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
    let {title,description, className, colNames} = init

    const [dataTree, setDataTree] = useState(data)

    return (
        <div className="list-tree">
            {
                dataTree.map(item=> {
                    return <RowItem />
                })
            }
        </div>
    )
}

export default ListTree