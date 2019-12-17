import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    SET_FARMS,
    SET_REVIEWS,
    SET_FARM_PROFILE
} from './types'
import { get } from 'http'

//Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//Update Password
export const updatePassword = (userData, history) => dispatch => {
    axios
        .post("/api/users/updatePassword", userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

//Forgot Password
export const forgotPasswordPerform = (userData, history) => dispatch => {
    axios
        .post("/api/users/forgotPassword", userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

//Login
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            //Set token to LocalStorage
            const token = res.data.token
            const _farms = res.data.farms
            const _reviews = res.data.reviews
            const _profiles = res.data.profiles

            localStorage.setItem("jwtToken", token)
            //Set token to header
            setAuthToken(token)
            //Decode token
            const payload = {
                user: jwt_decode(token),
                farms: _farms,
                reviews: _reviews,
                profiles: _profiles
            }
            //Set User
            dispatch(setCurrentUser(payload))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//Dashboard
export const setupDashboard = dispatch => {
    axios
        .get("/api/users/dashboard")
        .then(res => {
            //Should have a json object with reviews and farms to dispatch
            dispatch(setFarms(res.data.farms))
            dispatch(setReviews(res.data.reviews))
        })
        .catch(err => {
            console.log(err)
        }
        )
}

//Set Current User
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Set Farms
export const setFarms = farms => {
    return {
        type: SET_FARMS,
        payload: farms
    }
}

//Set Reviews
export const setReviews = reviews => {
    return {
        type: SET_REVIEWS,
        payload: reviews
    }
}

//User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

//Logout
export const logout = (history) => dispatch => {
    //Remove token
    localStorage.removeItem("jwtToken")
    //Remove Header
    setAuthToken(false)
    //Reset User
    dispatch(setCurrentUser({}))
    history.push("/")
}

//Farm Profile
export const farmProfile = (farm_data, history) => dispatch => {
    const payload = {
        farm_id: farm_data.farm_id,
        isFarmer: farm_data.isFarmer
    }

    axios
        .post("api/farm/farmProfile", payload)
        .then(res => {
            const farm_data = {
                displayName: res.data.displayName,
                description: res.data.description,
                isFarmer: payload.isFarmer,
                farm: payload.farm_id
            }

            dispatch({
                type: SET_FARM_PROFILE,
                payload: farm_data
            })

            
            history.push({
                pathname: '/farmProfile',
                state: {...farm_data}
              })
        })
        .catch(err => 
           dispatch({
               type: GET_ERRORS,
               payload: err.response.data
           }) 
        )
}

//Add Produce
export const addProduce = (farm_data, history) => dispatch => {
    history.push({
        pathname: '/addProduce',
        state: {...farm_data}
    })
}


//Feature Farms
// export const featureFarmsFetch = (history) => {
//     history.push("/featuredFarms")
// }
// export const featureFarmsFetch = (history) => dispatch => {
//     axios
//     .get("/api/farm/farms")
//     .then(res => {
//         const _farms  = res.data.farms
//         console.log("From from API Call: " +JSON.stringify(_farms))
//         //Set Farms
//         dispatch({
//             type:SET_FARMS,
//             payload: _farms
//         })
//         history.push("/featuredFarms")
//     })
//     .catch(err =>
//         dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         })
//     )  
// }