import config from 'config'

const api = () =>{
    const baseURL = config.API_URL
    const defaults = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        credentials: 'include'
    }
    const setBody = (body) => {
        defaults.body = JSON.stringify(body)
    }
    const getURL = (url = '') =>{
        return baseURL + url
    }
    const setMethod = (method = 'GET') =>{
        defaults.method = method
    }
    const setConfig = (config = {}) => {
        Object.assign(defaults, config)
    }
    const useFetch = (url) => {
        return fetch(url, defaults)
        .then((result) => {
            return result.json()
        }).catch((err) => {
            
        });
         
    }
    const GET = (url, config = {}) => {
        url = getURL(url)
        setMethod('GET')
        setConfig(config)
        return useFetch(url)
    }
    const POST = (url, body, config = {}) => {
        url = getURL(url)
        setMethod('POST')
        setBody(body)
        setConfig(config)
        return useFetch(url)
    }
    const PUT = (url, body, config = {}) => {
        url = getURL(url)
        setMethod('PUT')
        setBody(body)
        setConfig(config)
        return useFetch(url)
    }
    const DELETE = (url, config = {}) => {
        url = getURL(url)
        setMethod('DELETE')
        setConfig(config)
        return useFetch(url)
    }
    return {
        GET,
        POST,
        PUT,
        DELETE
    }
}

export default api