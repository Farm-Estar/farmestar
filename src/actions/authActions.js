import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    SET_FARMS,
    SET_REVIEWS,
    SET_FARM_PROFILE,
    ADD_PRODUCE,
    ADD_TO_CART
} from './types'
import { get } from 'http'
import { persistCombineReducers } from 'redux-persist'

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
            const _produce = res.data.produce
            const _profiles = res.data.profiles

            localStorage.setItem("jwtToken", token)
            //Set token to header
            setAuthToken(token)
            //Decode token
            const payload = {
                user: jwt_decode(token),
                farms: _farms,
                reviews: _reviews,
                produce: _produce,
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
    localStorage.removeItem("persist:root")
    //Remove Header
    setAuthToken(false)
    //Reset User
    dispatch(setCurrentUser({}))
    history.push("/")
}

//Previous Orders
export const previousOrders = (history) => dispatch => {
    history.push("/previousOrders")
}

//Payment Settings
export const paymentSettings = (history) => dispatch => {
    history.push("/paymentSettings")
}

//Account
export const account = (history) => dispatch => {
    history.push("/account")
}

//Support
export const support = (history) => dispatch => {
    history.push("/support")
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
                farm: payload.farm_id,
                imageUrl: res.data.imageUrl
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

//Nav setup for Produce
export const toProduce = (farm_data, history) => dispatch => {
    history.push({
        pathname: '/addProduce',
        state: {...farm_data}
    })
}

// Add Produce
export const addProduce = (produce_data, history) => dispatch => {
    const payload = {
        produce: []
    }
    const mapping_produce = {

    }

    axios
        .post("api/farm/addProduce", produce_data)
        .then(res => {
            console.log(JSON.stringify(res.data))
            mapping_produce._id = res.data._id,
            mapping_produce.farm = res.data.farm,
            mapping_produce.title = res.data.title,
            mapping_produce.description = res.data.description,
            mapping_produce.price = res.data.price,
            mapping_produce.sku = res.data.sku

            payload.produce.push(mapping_produce)

            dispatch({
                type: ADD_PRODUCE,
                payload: payload.produce
            })
            history.push("/dashboard")
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })    
        )
}

//Produce List
export const toListProduce = (farm_data, history) => dispatch => {
    //Take farm Id and map it against produce data to return only that farms
    history.push({
        pathname: '/listProduce',
        state: {...farm_data}
    })
}

//Produce Profile
export const produceProfile = (produce_data, history) => dispatch => {

    console.log("Hit Produce Profile Action with Payload :" + JSON.stringify(produce_data))

            history.push({
                pathname: '/produceProfile',
                state: {...produce_data}
              })
}

//Nav to Checkout
export const checkout = (history) => dispatch => {
    history.push("/checkout")
}

//Add To Cart
export const addToCart = (product_data, history) => dispatch => {
    history.push("/dashboard")
}

//Checkout Charge Card
export const chargeCard = (token_data, history) => dispatch => {
    console.log(JSON.stringify(token_data))
    axios
        .post("/api/users/charge", token_data)
        .then(res => {
            //Handle success payment
            if (res.status == 200) {
                //Success
                history.push("/dashboard")
            }else {
                //Failed
            }
        })
        .catch(err =>
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        )
}


//Checkout Continue Shopping
export const continueShopping = (history) => dispatch => {
    history.push("/dashboard")
}
