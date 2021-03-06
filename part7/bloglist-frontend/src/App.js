import React, { useEffect } from 'react'

import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Blog from './components/Blog'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { allUsers } from './reducers/userReducer'
import {
  Switch, Route, Link,
  useRouteMatch
} from 'react-router-dom'

import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const App = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(allUsers())
  }, [dispatch])

  const matchUsers = useRouteMatch('/users/:id')
  const theUser = matchUsers
    ? users.find(u => u.id === matchUsers.params.id)
    : null

  const matchBlogs = useRouteMatch('/blogs/:id')
  const theBlog = matchBlogs
    ? blogs.find(b => b.id === matchBlogs.params.id)
    : null

  const padding = {
    padding: 5
  }

  if (!user) {
    return (
      <Page className="container">
        <h2>login to application</h2>
        <Notification />
        <LoginForm />
      </Page>
    )
  }

  return (
    <Page className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <LoginForm style={padding} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h2>blog app</h2>
      <Notification />
      <Switch>
        <Route path="/users/:id">
          <User user={theUser} />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={theBlog} />
        </Route>
        <Route path="/">
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <NewBlog />
          </Togglable>
          <BlogList />
        </Route>
      </Switch>
    </Page>
  )
}

export default App