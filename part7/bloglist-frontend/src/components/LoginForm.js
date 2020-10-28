import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import loginService from '../services/login'
import storage from '../utils/storage'

const LoginForm = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
    dispatch(login(user))
  }, [])

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      setUser(user)
      dispatch(login(user))
      dispatch(setNotification(`${user.name} welcome back!`))
      storage.saveUser(user)
    } catch (exception) {
      dispatch(setNotification('wrong username/password', 'error'))
    }
  }

  const handleLogout = () => {
    dispatch(login(null))
    setUser(null)
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  return (
    <p>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </p>
  )
}

export default LoginForm