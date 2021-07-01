import axios from 'axios'
import {API_URL} from '../config'

export default axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type":"application/json"
    },
})