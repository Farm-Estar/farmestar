import {
    SET_CURRENT_USER,
    USER_LOADING,
    SET_FARMS,
    SET_REVIEWS
} from '../actions/types'


const isEmpty = require("is-empty")

const initialState = {
    isAuthenticated: false,
    user: {},
    farms: [],
    reviews: [],
    cart: [],
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_FARMS:
            return{
                ...state,
                farms: action.payload,
                loading: true
            }
        case SET_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
                loading: true
            }        
        default:
            return state        
    }
}