import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import RecommendendBooks from './components/RecommendendBooks'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    const {allBooks} = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: allBooks.concat(addedBook) }
      })
    }
    const {allAuthors} = client.readQuery({ query: ALL_AUTHORS })
    if (!includedIn(allAuthors, addedBook.author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: allAuthors.concat(addedBook.author) }
      })
    }
/*
    if (token) {
      const {favoriteGenre} = client.readQuery({ query: ME }).me
      const rootDataInStore = client.cache.data.data.ROOT_QUERY
      //const favoriteGenre = rootDataInStore.me.favoriteGenre
      const favoriteBooks = rootDataInStore[`allBooks({"genre":"${favoriteGenre}"})`]
      console.log(favoriteGenre)
      if (addedBook.genres.includes(favoriteGenre)) {
        rootDataInStore[`allBooks({"genre":"${favoriteGenre}"})`] = [...favoriteBooks, addedBook]
      }
    }*/
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('books-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <RecommendendBooks show={page === 'recommend'} />
      <NewBook show={page === 'add'} />
      <LoginForm
        show={page === 'login'}
        notify={notify}
        setToken={setToken}
        setPage={setPage}
        client={client}
      />
    </div>
  )
}

export default App