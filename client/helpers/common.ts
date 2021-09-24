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
    if (strClassName == null || strClassName == '') {
        return null
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