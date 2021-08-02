import iErrors from './IErrors'
class Errors implements  iErrors {
    private _errors: object = null
    private _hasError: boolean = false

    setError(attribute: string, messages: string): void{
        if (this._errors[attribute]) {
            this._errors[attribute].push(messages)
            this.hasErrors = true
        }else{
            this._errors[attribute] = Array(messages)
            this.hasErrors = true
        }
    }

    public get errors():object {
        return this._errors
    }

    public get hasErrors():boolean {
        return this._hasError
    }

    private set hasErrors(value: boolean) {
        this._hasError= value
    }
}

export default Errors