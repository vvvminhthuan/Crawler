import Validator from 'max-validator'
import joi from 'joi'
import {SigninUpMessage} from './signup'

const initalMessage = new Object()

Object.assign(initalMessage, SigninUpMessage)
Validator.setMessages(initalMessage)

export default Validator