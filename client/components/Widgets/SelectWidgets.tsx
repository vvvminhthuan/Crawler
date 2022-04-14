import React, {useState} from 'react'
type Prop = {
    className?: string,
    placeholder?: string,
    name?: string,
    value?: string,
    data?: any[],
    option?: {
        multi?: boolean,
        hasSearch?: boolean,
        fieldName?: string,
        fieldValue?: string
    }
}
const SelectWidgets: React.FC<Prop> = ({className, placeholder, name, value, data, option}) => {
    option.hasSearch = option?.hasSearch?? false
    option.multi = option?.multi?? false
    option.fieldName = option?.fieldName?? ''
    option.fieldValue = option?.fieldValue?? ''

    const [optionSelect, setOptionSelect] = useState([])

    return (
        <div className={`select-widget ${className}`}>
            <div className="select-field flex-r">
                <div className="label-option flex-r">
                    {
                        optionSelect.map(i=>{
                            <div className="label-item">
                                <span className="item-name">{i[option.fieldName]}</span>
                                <span className="item-remove">X</span>
                            </div>
                        })
                    }
                </div>
                <div className="select-input">
                    <input type="text" value={value} placeholder={placeholder} />
                </div>
            </div>
            
            <div className="list-option flex-c">
                {
                    data.map((item, e) => {
                        <label htmlFor={`option-${e}`} className="option">
                            <input type="checkbox" name={name} id={`option-${e}`} value={item[option.fieldValue]}/>
                            {item[option.fieldName]}
                        </label>
                    })
                }
            </div>
        </div>
    )
}

export default SelectWidgets