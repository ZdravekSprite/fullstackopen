import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  user: loginReducer,
  users: userReducer,
  blogs: blogReducer,
  notification: notificationReducer
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))