import React from 'react'

type Props = {
    init?: {
        title?: string,
        description?: string
        data?: any,
        className?: string,
        columnName?: any
    },
    option?: {
        hasFilter?: boolean
        hasPagination?:boolean,
        pagSize?: number,
        rowEdit?: {
            actionEdit: any,
            actionUpdate: any,
            actionDelete: any
        }
    }
}
const TableWidgets: React.FC<Props> = ({init, option}) => {
    let { title ,description, data, className, columnName } = init
    let { hasFilter, hasPagination, pagSize, rowEdit } = option??{}
    hasFilter = hasFilter??false
    hasPagination = hasPagination??false
    pagSize = pagSize??10
    rowEdit = rowEdit??null
    let rawRows = (rowData, index) => {
        let listKeys = Object.keys(rowData)
        return (
            <tr key={index}>
                {
                    listKeys.map((key, index) => {
                        return (
                            <td key={index}>{rowData[key]}</td>
                        )
                    })
                }
            </tr>
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
                        <div className="search-widget">
                            <input type="text" name="table-search"/>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg>
                            </button>
                        </div>
                    )
                }
            </div>
            <table className="widget">
                {columnName&&(<thead>
                    <tr>
                        {
                            columnName.map((name, index) => {
                                return <th key={index}>{name}</th>
                            })
                        }
                    </tr>
                </thead>)}
                <tbody>
                    {
                        data&&data.map((item, index) => {
                            return rawRows(item, index)
                        })
                    }
                </tbody>
            </table>
            {
                hasPagination&&(
                    <div className="table-footer flex-r">
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