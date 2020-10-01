import React from 'react'

const Header = ({ name }) =>
  <h2>{ name }</h2>

const Content = ({ parts }) =>
  <div>{ parts.map(part => <Part key={part.id} part={part} />)}</div>

const Part = ({ part }) =>
  <p>{ part.name } { part.exercises }</p>

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    console.log('what is happening', s, p)
    return s + p.exercises
  }, 0)
  return (
    <p><b>total of { total } exercises</b></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name = { course.name } />
      <Content parts = { course.parts } />
      <Total parts = { course.parts } />
    </div>
  )
}

export default Course