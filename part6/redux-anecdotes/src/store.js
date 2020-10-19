import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = (reducer) => createStore(
  reducer,
  composeWithDevTools()
)

export default store