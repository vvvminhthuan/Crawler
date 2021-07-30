import { fileURLToPath } from 'url'
import BaseMessage from './BaseMessagers'

class Messages {
    private _messages: object
    constructor(mesObj?: object) {
        Object.assign(this._messages, BaseMessage)
        if (mesObj) {
            Object.assign(this._messages, mesObj)
        }
    }
    public messages(rule: string, attribute: string): string {
        let mesGroup = this._messages[attribute]
        let cvAttribute = this.setFieldName(attribute)
        let mes:string = null
        if (mesGroup) {
            mes = mesGroup[rule]
        }else{
            mes = this._messages[rule]
        }
        return mes ? mes.replaceAll(':'+attribute, cvAttribute): ''
    }
    private setFieldName(fieldName: string): string {
        fieldName = fieldName.replaceAll(/([A-Z])/,(e)=>{
              return ' '+ e.toLowerCase()
        })
        fieldName = fieldName.replaceAll(/([_])/,' ')
        fieldName = fieldName.replaceAll(/(\s+)/,' ')
        return fieldName
    }
}

export default Messages