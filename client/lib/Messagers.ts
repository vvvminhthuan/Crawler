import BaseMessage from './BaseMessagers'
import iMessagers from './IMessagers'
class Messages implements iMessagers {
    private _messages: object = BaseMessage
    constructor(mesObj?: object) {
        if (mesObj) {
            Object.assign(this._messages, mesObj)
        }
    }
    public messages(rule: string, attribute: string): string {
        let arrRule = rule.split(':')
        rule = arrRule.shift()
        let arg0 = arrRule.shift() ?? ''
        let arg1 = arrRule.shift() ?? ''
        let mesGroup = this._messages[attribute]
        let cvAttribute = this.setFieldName(attribute)
        if (mesGroup&& 'object' == typeof mesGroup && mesGroup[rule]) {
            let ms = mesGroup[rule].replaceAll(':attribute', cvAttribute)
            ms = ms.replaceAll(':arg0', arg0)
            ms = ms.replaceAll(':arg1', arg1)
            return ms ?? ''
        }else{
            let ms = this._messages[rule].replaceAll(':attribute', cvAttribute)
            ms = ms.replaceAll(':arg0', arg0)
            ms = ms.replaceAll(':arg1', arg1)
            return ms ?? ''
        }
    }
    private setFieldName(fieldName: string): string {
        fieldName = fieldName.replaceAll(/([A-Z])/g,(e)=>{
              return ' '+ e.toLowerCase()
        })
        fieldName = fieldName.replaceAll(/([_])/g,' ')
        fieldName = fieldName.replaceAll(/(\s+)/g,' ')
        return fieldName
    }
}

export default Messages