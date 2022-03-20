import {useState, useEffect} from 'react'

const _rowTableWidget = ({rowData, columns, action, hasAction}) => {
    const [isEdit, setIsEdit] = useState(false),
         [isDelete, setIsDelete] = useState(false),
         [row, setRow] = useState(rowData)
            
    const actionEdit = () => {
        setIsEdit(!isEdit)
        action.delete(row)
    }

    const actionDelete = (isDelete) => {
        setIsDelete(!isDelete)
    }

    const actionUpdate = () => {
        action.update(row)
        setIsEdit(!isEdit)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value != row[e.target.name]) {
            setRow({...row, [e.target.name]: e.target.value})
        }
    }

    useEffect(()=>{
        setRow(rowData)
    }, [rowData])

    return !isDelete&&(
        <tr className={`widget-tr ${isEdit? 'action' : ''}`}>
            {
                columns.map((item, index) => {
                    if (isEdit) {
                        return(
                            <td key={index}>
                                <div className="input-group flex-c">
                                    <input type="text" defaultValue={row[item.key]} name={item.key} onChange={e => handleChange(e)}/>
                                </div>
                            </td>
                        )
                    } else {
                        return (
                            <td key={index}>{row[item.key]}</td>
                        )
                    }
                })
            }
            <td>
                {hasAction&&<div className="row-action">
                    {!isEdit&&<button className="action-edit" onClick={() => actionEdit()}>Edit</button>}
                    {isEdit&&<button className="action-update" onClick={() => actionUpdate()}>Update</button>}
                    {!isEdit&&<button className="action-delete" onClick={() => actionDelete(isDelete)}>Delete</button>}
                </div>}
            </td>
        </tr>
    )
}

export default _rowTableWidget