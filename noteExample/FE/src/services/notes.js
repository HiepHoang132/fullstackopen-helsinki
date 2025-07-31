import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers : {Authorization: token}
    }

    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


export default { setToken, getAll, create, update }