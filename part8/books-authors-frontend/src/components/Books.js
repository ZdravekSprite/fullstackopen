import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  let genres = []

  const allBooks = result.data.allBooks
  let books =  allBooks.filter(b => {
    const g = [...genres, ...b.genres]
    genres = g.filter((item, pos) => g.indexOf(item) === pos)
    if (!filter) {
      return b
    }
    return b.genres.includes(filter)
  })
  //console.log(books)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{(filter) ? filter : 'all genres'}</b></p>
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
      {genres.map(g =>
        <button key={g} onClick={() => setFilter(g)}>{g}</button>
      )}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books