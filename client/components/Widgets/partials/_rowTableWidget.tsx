import {useState} from 'react'

const _rowTableWidget = ({rowData, columns}) => {
    const [edit, setEdit] = useState(false)
    const actionEdit = (isEdit) => {
        setEdit(!isEdit)
    }
    return (
        <tr className={`widget-tr ${edit? 'action' : ''}`}>
            {
                columns.map((item, index) => {
                    if (edit) {
                        return(
                            <td key={index}>
                                <div className="input-group">
                                    <input type="text" defaultValue={rowData[item.key]} name={item.key}/>
                                </div>
                            </td>
                        )
                    } else {
                        return (
                            <td key={index}>{rowData[item.key]}</td>
                        )
                    }
                })
            }
            <td className="row-action">
                {!edit&&<button className="action-edit" onClick={() => actionEdit(edit)}>Edit</button>}
                {edit&&<button className="action-update" onClick={() => actionEdit(edit)}>Update</button>}
                {!edit&&<button className="action-delete" onClick={() => actionEdit(edit)}>Delete</button>}
            </td>
        </tr>
    )
}

export default _rowTableWidget