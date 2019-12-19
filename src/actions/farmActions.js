import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import {
    GET_ERRORS
} from './types'


//Register Farmer
export const registerFarmer = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res =>{
            //Get FarmersId and pass it into view to map data
            console.log(JSON.stringify(res))
            history.push({
                pathname: '/addFarm',
                state: { farmerId: res.data._id}
              })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//Add Farm
export const addFarm = (farmData, history) => dispatch => {
    axios
        .post("/api/farm/add", farmData)
        .then(res => history.push({
            pathname: '/addFarmProfile',
            state: {
                farmerId: res.data.farmer,
                farmId: res.data._id
            }
        }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//Add Profile
export const addProfile = (profileData, history) => dispatch => {
    axios
        .post("/api/farm/addFarmProfile", profileData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}