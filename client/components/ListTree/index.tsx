import React, {useState, useEffect} from 'react'
import RowItem from './RowItem'

type prop = {
    init?: {
        className?: string,
        titleName: string,
        childName: string,
        descName?: string,
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
    let {className, titleName, childName, descName} = init
    const [dataTree, setDataTree] = useState(data)

    const handAdd = () => {
        rowEdit.addNew({})
    }

    useEffect(()=>{
        setDataTree(data)
    }, [data])

    return (
        <div className={`list-tree ${className??''}`}>
            {
                dataTree&&dataTree.map((item, index)=> {
                    return <RowItem key={index} dataRow={item} titleName={titleName} childName={childName} descName={descName} isView={isView} rowEdit={rowEdit} lever={0}/>
                })
            }
            {
                !isView&&(
                    <div className="default-action flex-r">
                        <button className="action-add" onClick={() => handAdd()}>Add New Role</button>
                    </div>
                )
            }
        </div>
    )
}

export default ListTree