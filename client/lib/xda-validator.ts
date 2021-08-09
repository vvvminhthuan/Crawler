import Messagers from './Messagers'
import iMessagers from './IMessagers'
import Rules from './Rules'
import Errors from './Errors'
import iErrors from './IErrors'
import iXda from './IXda'

interface xdaError{
    hasError: boolean,
    errors: object
}
class Xda implements iXda {
    private _messages:iMessagers
    private _errors:iErrors
    private _rules:any
    private _hasError: boolean = false
    
    constructor(initalMessages?:object) {
        this._messages = new Messagers(initalMessages)
        this._rules = new Rules()
        this._errors = new Errors()
    }
    private detectedRules(rules:string):Array<string> {
        if ('object' == typeof rules) {
            return Object.keys(rules)
        }else{
            return rules.split('|')
        }
    }
    private callRuleString(rule:string, value:any):boolean {
        let arrRule:any[] =  rule.split(':')
        let funcRule = arrRule.shift()
        let callFunc = this._rules[funcRule]
        if (callFunc && typeof callFunc == 'function') {
            return callFunc(value,...arrRule)
        }
        return true
    }
    private callRuleObject(rule:any, value:any, arg?:any):boolean {
        let callFunc = this._rules[rule]
        if (callFunc && typeof callFunc == 'function') {
            if ('boolean' !== typeof arg) {
                return callFunc(value, ...arg)    
            }
            return callFunc(value)    
        }else{
            return rule(value)    
        }
        return true
    }
    /**
     * validate
     * rules is an object
     * value is an object
     * return object with hasErros: boolean, errors:object{attribute:Array<string>}
     */
    public validate(rules:object, values:object):xdaError {
        let listAttribute = Object.keys(rules)
        this.hasError = false
        this._errors = new Errors()
        try {
            listAttribute.forEach(e => {
                let attribute = rules[e]
                let listRules = this.detectedRules(attribute)
                for (let i = 0; i < listRules.length; i++) {
                    let valid:boolean = true
                    let ruleObj = attribute[listRules[i]]
                    if ('object' == typeof attribute) {
                        if ('function' == typeof ruleObj) {
                            valid = this.callRuleObject(ruleObj, values[e])
                        }else{
                            let arg = Array.isArray(ruleObj) ? ruleObj : [ruleObj]
                            valid = this.callRuleObject(listRules[i], values[e], arg)
                        }
                    }else{
                        valid = this.callRuleString(listRules[i], values[e])
                    }
                    if (!valid) {
                        let rule= listRules[i]
                        if ('object' == typeof attribute){
                            if ('function' !== typeof ruleObj){
                                let arg = Array.isArray(ruleObj) ? ruleObj.join(':') : ruleObj
                                rule += ':' + arg
                            }
                        }
                        let ms = this._messages.messages(rule ,e)
                        this._errors.setError(e,ms)
                        if (!this._hasError) {
                            this.hasError = true
                        }
                        break
                    }
                }
            })
        } catch (error) {
            throw error + ''
        }
        return {
            hasError: this.hasError,
            errors: this.errors
        }
    }
    private get hasError():boolean {
        return this._hasError
    }
    
    private set hasError(value: boolean) {
        this._hasError= value
    }
    /**
     * get errors
     */
    private get errors() {
        return {...this._errors.errors}
    }
}

export default Xda