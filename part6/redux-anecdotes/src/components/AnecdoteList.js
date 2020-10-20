import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  return (
    <>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteOn(anecdote.id))
            dispatch(setNotification(`you voted '${anecdote.content}'`))
            setTimeout(() => {
              dispatch(removeNotification())
            }, 5000)
          }
          }
        />
      )}
    </>
  )
}

export default AnecdoteList