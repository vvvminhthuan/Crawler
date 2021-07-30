import { types } from "joi"

interface iErrors {
    setError(attribute: string, messages: string): void,
    errors: object,
}
class Errors implements  iErrors {
    private _errors: object
    private _hasError: boolean

    setError(attribute: string, messages: string): void{
        if (this._errors[attribute]) {
            this._errors[attribute].push(messages)
        }else{
            this._errors[attribute] = Array(messages)
        }
    }

    public get errors() {
        return this._errors
    }

    public get hasErrors() {
        return this._hasError
    }

    public set hasErrors(value: boolean) {
        this._hasError= value
    }
}

export default Errors