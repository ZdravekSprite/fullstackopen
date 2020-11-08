import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ME, FIND_BOOKS } from '../queries'

const RecommendendBooks = (props) => {
  const user = useQuery(ME)
  const [getBooks, result] = useLazyQuery(FIND_BOOKS)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (user.data && user.data.me) {
      //console.log('u->', user.data)
      getBooks({ variables: { genreToSearch: user.data.me.favoriteGenre } })
    }
  }, [user.data, getBooks])

  useEffect(() => {
    if (result.data) {
      //console.log('b->', result.data)
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user.data.me.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendendBooks