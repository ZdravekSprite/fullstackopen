import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id !== id ? a : changedAnecdote
      )
    }
    default:
      return state
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW',
    data
  }
}

export const voteOn = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer