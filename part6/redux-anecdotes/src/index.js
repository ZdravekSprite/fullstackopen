import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import store from './store'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

ReactDOM.render(
  <Provider store={store(reducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
)
