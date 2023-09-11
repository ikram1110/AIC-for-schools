import { combineReducers } from 'redux'
import { globalReducer } from './containers/Main/reducers'

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    ...injectedReducers,
  })

  return rootReducer
}
