import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_YEAR } from '../queries'

const BirthyearForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor, result] = useMutation(EDIT_YEAR, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ],
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      console.log('name not found')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name: <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map(a =>
              <option key={a.name} value={a.name} >{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born: <input
            value={born}
            onChange={({ target }) => setBorn(target.value * 1)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm