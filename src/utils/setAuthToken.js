import axios from 'axios'

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
}

export const convertToBoolean = string => {
    let value 

    if (string == "true") {
        value = true
        return value
    }else {
        value = false 
        return value
    }
}

export default setAuthToken