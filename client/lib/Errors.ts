import iErrors from './IErrors'
class Errors implements  iErrors {
    private _errors: object = {}

    setError(attribute: string, messages: string): void{
        // Object.assign(this._errors,{
        //     [attribute]: messages?? ''
        // })
        this._errors[attribute] = messages
    }
    
    public get errors():object {
        return this._errors
    }
}

export default Errors