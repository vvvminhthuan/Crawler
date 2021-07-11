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