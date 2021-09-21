import {SigninUpMessage} from './Signup'
import Xda from 'lib/Validate/xda-validator'

const initalMessage = new Object()

Object.assign(initalMessage, SigninUpMessage)
const Validator = new Xda(initalMessage)

export default Validator