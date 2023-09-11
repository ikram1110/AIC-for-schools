import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'
import createReducer from './reducers'

export default function configureStore(initialState = {}) {
  const middleware = [thunk]

  const store = createStore(
    createReducer(),
    composeWithDevTools(applyMiddleware(...middleware))
  )

  return store
}
