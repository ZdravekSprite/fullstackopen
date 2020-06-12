import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const all = (a,b,c) => (
  a+b+c
)

const average = (a,b,c) => {
  if (a+b+c === 0) {
    return 0
  } else {
    return (a-c)/(a+b+c)
  }
}

const positive = (a,b,c) => {
  if (a+b+c === 0) {
    return 0 + ' %'
  } else {
    return a/(a+b+c)*100 + ' %'
  }
}

const Statistics = ({ good,neutral,bad }) => {

  if (all(good,neutral,bad) === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='all' value={all(good,neutral,bad)} />
      <Statistic text='average' value={average(good,neutral,bad)} />
      <Statistic text='positive' value={positive(good,neutral,bad)} />
    </table>
  )
}

const Statistic = ({ text, value }) => (
  <tbody><tr>
      <td>{text}</td>
      <td>{value}</td>
  </tr></tbody>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)