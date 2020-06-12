import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = ({ anecdote, point }) => (
  <>
    <h2>Anecdote of the day</h2>
    {anecdote}<br />
    has {point} votes<br />
  </>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0})
  const [max, setMax] = useState([0,0])

  const handleVoteClick = () => {
    const copy = { ...points }
    copy[selected] += 1
    if (copy[selected] > max[1]) { setMax([selected, copy[selected]]) }
    setPoints(copy)
  }
  
  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  return (
    <div>
      <Anecdote anecdote={props.anecdotes[selected]} point={points[selected]} />
      <Button onClick={handleVoteClick} text='vote' />
      <Button onClick={handleNextClick} text='next anecdote' />
      <Anecdote anecdote={props.anecdotes[max[0]]} point={points[max[0]]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)