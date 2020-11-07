import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ME, FIND_BOOKS } from '../queries'

const RecommendendBooks = (props) => {
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])
  const result = useQuery(ME)
  const [getBooks, resultMy] = useLazyQuery(FIND_BOOKS)

  useEffect(() => {
    if (result.data && result.data.me) {
      //console.log('g->', result.data)
      setGenre(result.data.me.favoriteGenre)
      getBooks({ variables: { genreToSearch: genre } })
    }
  }, [result.data, genre, getBooks])

  useEffect(() => {
    if (resultMy.data) {
      //console.log('b->', resultMy.data)
      setBooks(resultMy.data.allBooks)
    }
  }, [resultMy.data])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{(genre) ? genre : 'all genres'}</b></p>
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