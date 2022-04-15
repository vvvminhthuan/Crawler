import React from 'react'

function _selectOptionWidget({name, fieldName, fieldValue, createAttr, index, multi}) {
  return (
    <label htmlFor={`option-${index}`} className="option">
        <input type={multi? 'checkbox': 'radio'} {...createAttr(name)} id={`option-${index}`} value={fieldValue}/>
        {fieldName}
    </label>
  )
}

export default _selectOptionWidget