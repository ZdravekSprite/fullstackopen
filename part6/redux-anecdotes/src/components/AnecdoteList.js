import React from 'react'
import { connect } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

const AnecdoteList = (props) => {
  const anecdotes = () => {
    if (props.filter === '') {
      return props.anecdotes
    }
    return props.anecdotes.filter(a => a.content.toUpperCase().includes(props.filter.toUpperCase()))
  }

  return (
    <>
      {anecdotes().sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            props.voteOn(anecdote.id)
            props.setNotification(`you voted '${anecdote.content}'`)
          }
          }
        />
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  voteOn,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)