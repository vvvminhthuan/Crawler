import {SigninUpMessage} from './signup'
import Xda from 'lib/xda-validator'

const initalMessage = new Object()

Object.assign(initalMessage, SigninUpMessage)
const Validator = new Xda(initalMessage)

export default Validator