import React, {useState, useRef} from 'react'
import {aciteElement, filterDataTableWidgets} from '../../helpers/common'
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
          [activeFilter, setactiveFilter] = useState(false),
          [pageSize, setPageSize] = useState([10,20,30,40,50,100,200]),
          [currentPageSize, setCurrentPageSize] = useState(50),
          [currentPage, setCurrentPage] = useState(1)

    const refFilter = useRef(null)
    aciteElement(refFilter, setactiveFilter)

    let { title ,description, data, className, columns } = init
    let { hasFilter, hasPagination, pagSize, rowEdit } = option??{}
    hasFilter = hasFilter??false
    hasPagination = hasPagination??false
    pagSize = pagSize??10
    rowEdit = rowEdit??null

    const [rows, setRows] = useState(data)

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
        if (e.target.value) {
            let result = filterDataTableWidgets(data, columns, filter, e.target.value)
            setRows(result)
        }else{
            // set lai mat dinh
            setRows(data)
        }
        
    }

    const handlePageSize = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentPageSize(parseInt(e.target.value))
        setCurrentPage(1)
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

    const rawPagination = () => {
        let maxPage = rows.length > currentPageSize ? (rows.length%currentPageSize == 0 ? rows.length/currentPageSize : Math.floor(rows.length/currentPageSize) + 1) : 1
        let elePage = []
        for (let page = 1; page <= maxPage; page++) {
            elePage.push(<li key={page} className={`page-item ${page==currentPage? 'active': ''}`} onClick={()=>setCurrentPage(page)}>{page}</li>)
        }
        return (
            <ul className="table-pagination flex-r">
                <li className="page-item previous" onClick={()=>setCurrentPage(currentPage>1 ? currentPage-1 : 1)}>&laquo;</li>
                { elePage }
                <li className="page-item next" onClick={()=>setCurrentPage(currentPage<maxPage ? currentPage+1 : maxPage)}>&raquo;</li>
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
                                rows&&(<div className={`filter-property flex-c ${activeFilter? 'active' : ''}`} ref={refFilter}>
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
                        rows&&rows.filter((e, i) => i >= ((currentPage-1)*currentPageSize + 1) && i<= ( currentPage*currentPageSize < rows.length?currentPage*currentPageSize:rows.length))
                            .map((item, index) => {
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
                                <select name="show-quality" defaultValue={currentPageSize} onChange={e=>handlePageSize(e)}>
                                    {
                                        pageSize.map((rand, index)=>{
                                            return <option key={index} value={rand}>{rand}</option>
                                        })
                                    }    
                                </select>
                            </div>
                            <div className="info-status">
                                <span>Showing {(currentPage -1 ) * currentPageSize + 1} to {currentPage*currentPageSize > rows.length ? rows.length : currentPage*currentPageSize } of {rows.length} entries</span>
                            </div>
                        </div>
                        { rawPagination() }
                    </div>
                )
            }
        </div>
    )
}
export default TableWidgets