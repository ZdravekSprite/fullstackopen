import React, { useEffect } from 'react'

import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { allUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

const App = () => {
  const user = useSelector(state => state.user)
  const blogFormRef = React.createRef()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(allUsers())
  }, [dispatch])

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LoginForm />
      <Router>
        <Switch>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/">
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <NewBlog />
            </Togglable>
            <BlogList />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App