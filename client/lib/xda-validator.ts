import Messagers from './Messagers'
import Rules from './Rules'
import Errors from './Errors'
interface iXda{
    validate(rule:object, value:object)
}
 class Xda {
     private _messages:object
     private _errors:object
     private _rules:object
     private _listRules:Array<string|object>
     
     constructor(initalRules:object, initalMessages?:object) {
        this._messages = new Messagers(initalMessages)
        this._rules = new Rules()
        this._errors = new Errors()
     }
 }

export default Xda