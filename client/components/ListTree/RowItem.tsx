import React from 'react'

const RowItem = ({dataRow}) => {
    console.log(dataRow.child.length)
    return (
        <div className="item-tree">
            <div className="item-content">{dataRow.name}</div>
            {
                (dataRow.child.length>0)&&(
                    <div className="item-child">
                        {dataRow.child.map((e, i)=>{
                            return <RowItem dataRow={e} key={i}/>
                        })}
                    </div> 
                )
            }           
        </div>
    )
}
export default RowItem