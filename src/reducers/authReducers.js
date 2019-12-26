import {
    SET_CURRENT_USER,
    USER_LOADING,
    SET_FARMS,
    SET_REVIEWS,
    SET_FARM_PROFILE,
    ADD_PRODUCE,
    ADD_TO_CART
} from '../actions/types'
import {REHYDRATE, PERSIST} from 'redux-persist/es/constants'


const isEmpty = require("is-empty")

const initialState = {
    isAuthenticated: false,
    user: {},
    farms: [],
    reviews: [],
    profiles:[],
    produce:[],
    cart: [],
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case REHYDRATE:
            console.log(action.payload)
            var incoming = action.payload.auth
            if (incoming) return {...state, ...incoming}

            return state
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload.user,
                farms: action.payload.farms,
                produce: action.payload.produce,
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
        case ADD_PRODUCE:
            return {
                ...state,
                produce: action.payload,
                loading:true
            }                    
        default:
            return state        
    }
}