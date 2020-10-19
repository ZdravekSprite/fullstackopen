import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import store from './store'

ReactDOM.render(
  <Provider store={store(reducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
)
