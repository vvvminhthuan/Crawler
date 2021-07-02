module.exports = {
    setRes: (res, statusCode, success, message, result, authention) =>{
        res.status(statusCode)
        let obj = {
            success: success,
            message: message, 
        }
        if (authention != undefined) {
            Object.assign(obj, {authention: authention})
        }
        if (result != undefined) {
            Object.assign(obj, {results: result})
        }
        res.json(obj)
    }
}