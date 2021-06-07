"use strict" 

const poolSingleton = require('./PoolSingleton')

const Provider = ( _pool => {
    var _params
    var _queryStr
    function connect() {
        return _pool.connect()
            .then(client =>{
                return client
            })
            .catch(err => {
                throw err
            })
    }
    return {
        set paramsQuery(params){
            _params = params 
        },
        get paramsQuery(){
            return _params
        },
        set queryStr(queryStr){
            _queryStr = queryStr 
        },
        get queryStr(){
            return _queryStr
        },
        async execute(isTransactions = false) {
            let client = await connect()
            isTransactions ? client.query('BEGIN') : null
            let params = this.paramsQuery || null
            return await client.query(this.queryStr, params)
            .then(result =>{
                isTransactions ? client.query('COMMIT') : null
                return result
            })
            .catch(err =>{
                isTransactions ? client.query('ROLLBACK') : null
                console.log(err);
                throw err
            })
            .finally(()=>{
                client.release()
            })
        },
        
    }
})(poolSingleton.getInstance())

module.exports = Provider