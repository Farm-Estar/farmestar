import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import {composeWithDevTools} from 'redux-devtools-extension'

const initialState = {}
const middleware = [thunk]

//For Production remove composeWithDevTools to compose

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
    // composeWithDevTools(
    //     applyMiddleware(...middleware)
    // )
)

export default store;