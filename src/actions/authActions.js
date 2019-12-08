import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    SET_FARMS,
    SET_REVIEWS
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
    console.log("Call Data: " + toString(userData))
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
            const { token } = res.data
            localStorage.setItem("jwtToken", token)
            //Set token to header
            setAuthToken(token)
            //Decode token
            const decoded = jwt_decode(token)
            //Set User
            dispatch(setCurrentUser(decoded))
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
        .catch(err =>
            {
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
}