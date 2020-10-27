import { combineReducers, createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
// import { composeWithDevTools } from "remote-redux-devtools"

import quizReducer from "./quiz/reducers"

const initialState = {}
const middlewares = [thunk]

const allReducers = combineReducers({
	quiz: quizReducer,
})

// const composeEnhancers = composeWithDevTools({ realtime: true, port: 19002 })

const store = createStore(
	allReducers,
	initialState,
	compose(applyMiddleware(...middlewares))
)

export default store
