import {
    SET_CURRENT_USER,
    SET_GUEST_USER,
    CLEAR_GUEST_USER,
    USER_LOADING,
    SET_FARMS,
    SET_REVIEWS,
    SET_FARM_PROFILE,
    ADD_PRODUCE,
    ADD_TO_CART,
    REMOVE_PRODUCT
} from '../actions/types'
import {REHYDRATE, PERSIST} from 'redux-persist/es/constants'


const isEmpty = require("is-empty")

const initialState = {
    isAuthenticated: false,
    isGuest: false,
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
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload.user,
                farms: action.payload.farms,
                produce: action.payload.produce,
                reviews: action.payload.reviews,
                profiles: action.payload.profiles,
                cart:[]
            }
        case SET_GUEST_USER:
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload.user,
                isGuest: true,
                farms: action.payload.farms,
                produce: action.payload.produce,
                profiles: action.payload.profiles,
                cart:[]
            }
        case CLEAR_GUEST_USER:
            return{
                isGuest: false
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
                produce: [...state.produce, action.payload],
                loading:true
            } 
        case REMOVE_PRODUCT:
            // eslint-disable-next-line no-case-declarations
            const index = action.payload.product_index
            // const id = action.payload.productId
            
            console.log("REMOVE PRODUCT " + index)
            return {
                ...state,
                produce: [
                    ...state.produce.slice(0, index + 1),
                    ...state.produce.slice(index + 1)
                ],
                loading: true
            }                       
        default:
            return state        
    }
}