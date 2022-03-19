import exp from 'constants'
import React, { useEffect } from 'react'

export const setMessageErros = (result: any): any =>{
    let err = {}
    if (result.results) {
        let listErr = result.results.error
        Object.keys(listErr).forEach(item => {
            err[item] = listErr[item].message
        })
    }else{
        err = {
            message: result.message
        }
    }
    return err
}
export const getParent = (elementName : string, tagElement: any): any =>{
    let strClassName = tagElement ? tagElement.className : ''
    if (tagElement == null || (tagElement != null && tagElement.tagName.toUpperCase() == 'BODY')) {
        return null
    }
    if (strClassName == '') {
        getParent(elementName, tagElement.parentElement)
    }
    if (typeof(strClassName) == 'string' && strClassName.indexOf(elementName) >= 0) {
        return tagElement
    }else{
        return getParent(elementName, tagElement.parentElement)
    }
}
export const getChildren = (elementName: string, tagElement : any) : any => {
    if (!tagElement) {
        return null
    }
    let child = tagElement.querySelectorAll(`.${elementName}`)
    if (child) {
        return child[0]
    }
    return null
}

export const timeToLocal = (date) => {
    var local = new Date(date)
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset())
    return local.toJSON()
}
  
export const timeToJSONLocal = (date) => {
    var local = new Date(date);
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset())
    return local.toJSON().slice(0, 19).replace('T', ' ')
}

export const forcusOutside = (ref: React.MutableRefObject<any>, setState: any) => {
    useEffect(()=>{
        function handleClickOutside(event) {
            if (ref.current && ref.current.contains(event.target)) {
                setState(true)
            }else{
                setState(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return ()=> {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])
}

export const aciteElement = (ref: React.MutableRefObject<any>, setState: any) => {
    let acitve = false
    useEffect(()=>{
        function handleClickOutside(event) {
            if (ref.current && ref.current.contains(event.target)) {
                setState(!acitve)
                acitve = !acitve
            }else{
                setState(false)
                acitve = false
            }
        }
        document.addEventListener('click', handleClickOutside)
        return ()=> {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [ref])
}

export const filterDataTableWidgets = (data: object[], colName: any[], colFilter: string[], strSearch: string):object[] => {
    return data.filter(row =>{
        if (rulesFilters(row, colName, colFilter, strSearch.toLowerCase())==true) {
            console.log(row)
            return row
        }
    })
}

const rulesFilters = (item: object, colName: any[], colFilter: string[], strSearch: any): boolean => {
    let isFilter = false
    if (colFilter.length) {
        for (let i of colName) {
            let isHas = colFilter.some(s=> s == i.key)
            if (!isFilter&&isHas && item[i.key] && item[i.key].toString().toLowerCase().indexOf(strSearch.trim())!=-1) {
                isFilter = true
                break
            }
        }
    }else{
        for (let i of colName) {
            if (!isFilter&&item[i.key] && item[i.key].toString().toLowerCase().indexOf(strSearch.trim())!=-1) {
                isFilter = true
                break
            }
        }
    }
    return isFilter
}