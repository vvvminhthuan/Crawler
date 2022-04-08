import React from 'react'

const RowItem = ({dataRow, titleName, childName, descName, isView, rowEdit, lever}) => {
    return (
        <>
            <div className="item-tree">
                <div className="item-content flex-r">
                    <div className={`item-name ${lever!=0? 'ml-' + lever: ''}`}>
                        <div className="label">{dataRow[titleName]}</div>
                        <div className="description">{dataRow[descName]?? ''}</div>
                    </div>
                    {
                        !isView &&(
                            <div className="item-action flex-r">
                                <button className="action-add-child" onClick={(e) => rowEdit.addNew(e)}>Add children</button>
                                <button className="action-update" onClick={(e) => rowEdit.update(e)}>Edit</button>
                                <button className="action-delete" onClick={(e) => rowEdit.delete(e)}>Delete</button>
                            </div>
                        )
                    }
                </div>
                {
                    (dataRow[childName].length>0)&&(
                        <>
                            <div className="line"></div>
                            <div className="item-child">
                                {dataRow.child.map((e, i)=>{
                                    return <RowItem dataRow={e} key={i} titleName={titleName} childName={childName} descName={descName} isView={isView} rowEdit={rowEdit} lever={++lever}/>
                                })}
                            </div> 
                        </>
                    )
                }
                        
            </div>
        </>
    )
}
export default RowItem