import React, {useState, useEffect, useRef} from 'react'
import _selectOptionWidget from './partials/_selectOptionWidget'
import LabelOptionWidget from './partials/LabelOptionWidget'
type Prop = {
    name: string,
    value?: any,
    data: any[],
    createAttr: any
    option?: {
        multi?: boolean,
        fieldName?: string,
        fieldValue?: string,
        className?: string,
        placeholder?: string,
    }
}
const SelectWidgets: React.FC<Prop> = ({name, value, data, createAttr, option}) => {
    option.multi = option?.multi?? false
    option.fieldName = option?.fieldName?? ''
    option.fieldValue = option?.fieldValue?? ''
    option.className = option?.className?? ''
    option.placeholder = option?.placeholder?? ''
    const [optionSelect, setOptionSelect] = useState([])
    const [active, setActive] = useState(false)

    const inputSearch = useRef(null)
    const listOption = useRef(null)

    const handRemove = (e) => {
        console.log('handRemove', e)
    }
    const handleClickOutside = (event) => {
        if (listOption.current && !listOption.current.contains(event.target) && active == true) {
            setActive(false)
        }
    }
    useEffect(()=>{
        if (typeof value == "string" || typeof value == "number") {
            let listItem = data&&data.filter(i=>i[option.fieldValue]==value)
            setOptionSelect(listItem)
        } else {
            let listItem = data&&data.filter(i=>value.some(s=>s==i[option.fieldValue]))
            setOptionSelect(listItem)
        }
        document.addEventListener('click', handleClickOutside)
        return ()=> {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [value])
    
    const handClickSearch = () =>{
        inputSearch.current.focus()
        setActive(true)
    }

    const handShowOption = () => {
        setActive(!active)
    }
    return (
        <div className={`select-widget ${option.className} ${active? 'active': ''}`} ref={listOption}>
            <div className="select-field flex-r">
                <div className="label-option flex-r" onClick={()=>handClickSearch()}>
                    {
                        optionSelect&&optionSelect.map((i, e)=>{
                            return <LabelOptionWidget fieldName={i[option.fieldName]} item={i} onHand={handRemove} key={e}/>
                        })
                    }
                    <div className="select-input">
                        <input type="text" name='selectSearch' ref={inputSearch} placeholder={optionSelect?.length == 0 ? option.placeholder: ''} />
                    </div>
                </div>
                <div className="aciton flex-r">
                    <div className="icon icon-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                    <div className="icon icon-down" onClick={()=>handShowOption()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" height="16" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="list-option flex-c" onClick={()=>setActive(false)}>
                {
                    data&&data.map((item, e) => {
                        return <_selectOptionWidget name={name} createAttr={createAttr} fieldValue={item[option.fieldValue]} fieldName={item[option.fieldName]} index={e} multi={option.multi} key={e}/>
                    })
                }
            </div>
        </div>
    )
}

export default SelectWidgets