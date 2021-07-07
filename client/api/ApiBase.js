import axios from 'axios'
import {API_URL} from './RouteBase'

export default axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type":"application/json"
    },
})