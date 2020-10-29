import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const UserList = () => {
  const users = useSelector(state => {
    const byBlogs = (u1, u2) => u2.blogs.length - u1.blogs.length
    return state.users.sort(byBlogs)
  })

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u =>
            <tr key={u.id}>
              <td><Link to={'/users/' + u.id}>{u.name}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
export default UserList