import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      //console.log('-->', result.data)
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('books-user-token', token)
      props.client.resetStore()
      props.setPage('books')
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  const submit = async e => {
    e.preventDefault()

    login({
      variables: {
        username: e.target.username.value,
        password: e.target.password.value
      }
    })
  }

  return (
    <form onSubmit={submit}>
      <div>
        username
      <input type='text' name='username' />
      </div>
      <div>
        password:
      <input type='password' name='password' />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm