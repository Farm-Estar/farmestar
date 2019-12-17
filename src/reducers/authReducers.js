import {
    SET_CURRENT_USER,
    USER_LOADING,
    SET_FARMS,
    SET_REVIEWS,
    SET_FARM_PROFILE
} from '../actions/types'


const isEmpty = require("is-empty")

const initialState = {
    isAuthenticated: false,
    user: {},
    farms: [],
    reviews: [],
    profiles:[],
    cart: [],
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload.user,
                farms: action.payload.farms,
                reviews: action.payload.reviews,
                profiles: action.payload.profiles
            }
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
                loading: true
            }
        case SET_FARM_PROFILE:
            return {
                ...state,
                farmProfile: action.payload,
                loading: true
            }            
        default:
            return state        
    }
}

// case SET_FARMS:
//             return{
//                 ...state,
//                 loading: true,
//                 farms: action.payload.farms
//             }