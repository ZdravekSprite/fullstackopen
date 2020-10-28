import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector(state => {
    const byBlogs = (u1, u2) => u2.blogs.length - u1.blogs.length
    return state.users.sort(byBlogs)
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u =>
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
export default UserList