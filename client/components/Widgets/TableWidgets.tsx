import { checked } from 'lib/Validate/BaseMessagers'
import React, {useState, useRef} from 'react'
import {aciteElement} from '../../helpers/common'
import _rowTableWidget from './partials/_rowTableWidget'
interface field {
    name: string,
    key: string,
    className?: string,
    action?: any,
    html?: React.FC
}

type Props = {
    init?: {
        title?: string,
        description?: string,
        data?: any,
        className?: string,
        columns?: field[]
    },
    option?: {
        hasFilter?: boolean
        hasPagination?:boolean,
        pagSize?: number,
        rowEdit?: {
            show: any,
            update: any,
            delete: any
        }
    }
}

const TableWidgets: React.FC<Props> = ({init, option}) => {
    const [filter, setFilter] = useState([]),
          [activeFilter, setactiveFilter] = useState(false)

    const refFilter = useRef(null)
    aciteElement(refFilter, setactiveFilter)

    let { title ,description, data, className, columns } = init
    let { hasFilter, hasPagination, pagSize, rowEdit } = option??{}
    hasFilter = hasFilter??false
    hasPagination = hasPagination??false
    pagSize = pagSize??10
    rowEdit = rowEdit??null

    const handleFilterClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setFilter([...filter, e.target.value])
        } else {
            setFilter(filter.filter(i=>{
                if (i!=e.target.value) {
                    return i
                }
            }))
        }
        
    }

    const handlSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(filter)
    }

    const rawFilter = () => {
        return (
            <ul className='list-filter'>
                {
                    columns.map((item, i) => {
                        return (<li key={i} className='flex-r'>
                            <input type="checkbox" 
                                name="list-filter" 
                                id={`table-filter-${i}`} 
                                value={item.key} 
                                onChange={e=>handleFilterClick(e)}
                                checked={filter.some(i=>i==item.key)}/>
                            <label htmlFor={`table-filter-${i}`}>{item.name}</label>
                        </li>)
                    })
                }    
            </ul>
        )
    }

    return (
        <div className={`table-widget flex-c ${className??''}`}>
            <div className="table-header flex-r">
                <div className="title-widget">
                    {title&&(<h2>{title}</h2>)}
                    {description&&(<span>{description}</span>)}
                </div> 
                {
                    hasFilter&&(
                        <div className="search-widget flex-r">
                            {
                                data&&(<div className={`filter-property flex-c ${activeFilter? 'active' : ''}`} ref={refFilter}>
                                    <div className="lb-filter flex-r">
                                        <span>Filter By</span>   
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                                        </svg> 
                                    </div>
                                    {rawFilter()}
                                </div>)
                            }
                            <div className="input-group flex-r">
                                <input type="text" name="table-search" placeholder='Search' onChange={e=>handlSearchChange(e)}/>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
            <table className="table-content">
                {columns&&(<thead>
                    <tr>
                        {
                            columns.map((item, index) => {
                                return <th key={index}>{item.name}</th>
                            })
                        }
                        <th className='col-action'></th>
                    </tr>
                </thead>)}
                <tbody>
                    {
                        data&&data.map((item, index) => {
                            return <_rowTableWidget rowData={item} key={index} columns={columns} action={rowEdit}/>
                        })
                    }
                </tbody>
            </table>
            {
                hasPagination&&(
                    <div className="table-footer flex-r">
                        <div className="footer-info flex-r">
                            <div className="show-quality">
                                <span>Show</span>
                                <select name="show-quality">
                                    <option value="10">10</option>    
                                    <option value="20">20</option>    
                                    <option value="30">30</option>    
                                    <option value="40">40</option>    
                                    <option value="50">50</option>    
                                </select>
                            </div>
                            <div className="info-status">
                                <span>Showing 1 to 10 of 57 entries</span>
                            </div>
                        </div>
                        <ul className="table-pagination flex-r">
                            <li className="page-item previous">&laquo;</li>
                            <li className="page-item active">1</li>
                            <li className="page-item">2</li>
                            <li className="page-item">3</li>
                            <li className="page-item">4</li>
                            <li className="page-item">5</li>
                            <li className="page-item next">&raquo;</li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}
export default TableWidgets