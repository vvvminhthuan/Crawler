import Messagers from './Messagers'
import iMessagers from './IMessagers'
import Rules from './Rules'
import Errors from './Errors'
import iErrors from './IErrors'
import iXda from './IXda'
class Xda implements iXda {
    private _messages:iMessagers
    private _errors:iErrors
    private _rules:any
    
    constructor(initalMessages?:object) {
        this._messages = new Messagers(initalMessages)
        this._rules = new Rules()
        this._errors = new Errors()
    }
    private detectedRules(rules:string):Array<string> {
        return rules.split('|')
    }
    private callRule(rule:string, value:any):boolean {
        let arrRule:any[] =  rule.split(':')
        let funcRule = arrRule.shift()
        let callFunc = this._rules[funcRule]
        if (callFunc && typeof callFunc == 'function') {
            return callFunc(value,...arrRule)
        }else if (typeof callFunc == 'function') {
            return funcRule(value,...arrRule)
        }
        return true
    }
    /**
     * validate
     * rules is an object
     * value is an object
     * return object with hasErros: boolean, errors:object{attribute:Array<string>}
     */
    public validate(rules:object, values:object) {
        let listAttribute = Object.keys(rules)
        listAttribute.forEach(e => {
            let listRules = this.detectedRules(rules[e])
            for (let i = 0; i < listRules.length; i++) {
                let inValid:boolean = this.callRule(listRules[i], values[e])
                if (!inValid) {
                    let ms = this._messages.messages(listRules[i],e)
                    this._errors.setError(e,ms)
                    break;
                }
            }
            
        })
        return this._errors
    }
}

export default Xda