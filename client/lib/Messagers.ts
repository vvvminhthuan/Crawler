import BaseMessage from './BaseMessage'

class Messages {
    private _messages: object
    constructor(mesObj?: object) {
        Object.assign(this._messages, BaseMessage)
        if (mesObj) {
            Object.assign(this._messages, mesObj)
        }
    }
    public get messages() {
        return this._messages
    }
}

export default Messages