
import Messages from './Messages'

interface iErrors {
    setError(property: string, rule: string| object): void,
    getError(property: string, rule: string| object): string,
}

class Errors implements  iErrors {
    private _errors: object
    private _messages: object

    constructor(messages: Messages) {
        this._messages = messages.messages
    }
    hasError: boolean
    setError(property: string, rule: string| object): void{

    }
    getError(property: string, rule: string| object): string{
        return ''
    }
}

export default Errors