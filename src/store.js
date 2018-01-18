import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './ducks/reducer'
import thunk from 'redux-thunk'

export default createStore(reducer, applyMiddleware(promiseMiddleware(),thunk));