"use strict"
var format = require('pg-format')
const Provider = require('../provider')
const Generals = require('../provider/Generals')

const Model = ( provider => {
    function detectedColumns(params) {
        let listKey = {}
        if (params) {
            if (Array.isArray(params)) {
                params.forEach(item => {
                    listKey = Object.assign(listKey, item)
                })
            }else{
                listKey = Object.assign(listKey, params)
            }
            
        }
        return Object.keys(listKey)
    }
    function detectedQueryInsert(params){
        let strQuery = ''
        let listColumns = detectedColumns(params)
        if (listColumns) {
            strQuery = `(${listColumns.join(', ')} , created_at)`
        }
        return strQuery
    }
    function detectedParamsInsert(params){
        let arrParams = []
        let listColumns = detectedColumns(params)
        if (params) {
            if (typeof(params)!='object') {
                params.forEach(item => {
                    let row = []
                    listColumns.forEach( col => {
                        row.push(item[col])
                    })
                    row.push('CURRENT_TIMESTAMP') 
                    arrParams.push(row)
                })
            }else {
                let row = []
                listColumns.forEach( col => {
                    row.push(params[col]) 
                })
                row.push('CURRENT_TIMESTAMP') 
                arrParams.push(row)
            }
        }
        let paramString = format('VALUES %L',arrParams)
        return paramString.replaceAll("'CURRENT_TIMESTAMP'", 'CURRENT_TIMESTAMP')
    }
    function detectedQueryUpdate(params){
        let listColumns = detectedColumns(params)
        let strQuery = ''
        listColumns.forEach(item => {
            strQuery = strQuery + (strQuery ? ',': 'SET ') + format(`${item} = %L`, params[item])
        })
        return strQuery + ', update_at= CURRENT_TIMESTAMP'
    }
    // [[1],[2,3]] =>(('1'), ('2', '3'))
    function rawCondition(condition) {
        let strCondition = ''
        var count = 0
        if (condition) {
            condition.forEach(item => {
                let conditionName = Object.keys(item)[0] 
                let objName = Object.keys(item[conditionName])[0]
                let objValue = item[conditionName][objName]
                let condition = Object.keys(item[conditionName])[1]
                let operator = item[conditionName][condition] || '='
                if (objValue) {
                    strCondition = strCondition + (count != 0 ? ' ' + conditionName : '') + ' ' + objName + ' ' + operator.toUpperCase() +  format(' %L' , objValue)
                    count= count + 1
                }
            })
        }        
        return strCondition ? ' WHERE' + strCondition : ''
    }
    return {
        select: async (query, condition = null) => {
            let conditionStr = rawCondition(condition)
            provider.queryStr = query + conditionStr
            let result = await provider.execute() 
            return result.rows
        },
        update: (query, params, condition = null) => {
            let conditionStr = rawCondition(condition)
            let detectedQuery = detectedQueryUpdate(params)
            provider.queryStr = query + detectedQuery + conditionStr
            provider.execute(true)
            .then(result => {
                return result.rowCount
            })
            .catch(err =>{
                throw err.detail
            })
        },
        insert: (query, params) => {
            let detectedQuery = detectedQueryInsert(params)
            let detectedParams = detectedParamsInsert(params) 
            provider.queryStr = query + detectedQuery + ' ' + detectedParams
            provider.execute(true)
            .then(result => {
                return result.rowCount
            })
            .catch(err =>{
                throw err.detail
            })
        },
        delete: (query, params, condition = null) => {
            let conditionStr = rawCondition(condition)
            let detectedQuery = detectedQueryUpdate(params)
            provider.queryStr = query +  detectedQuery + ' ' + conditionStr
            provider.execute(true)
            .then(result => {
                return result.rowCount
            })
            .catch(err =>{
                throw err.detail
            })
        }
    }
})(Provider)

module.exports = Model 