import axios from 'axios'
import config from '../config'

export default axios.create({
    baseURL: config.API_URL,
    timeout: 10000,
    headers: {
        "Content-Type":"application/x-www-form-urlencoded"
    },
});