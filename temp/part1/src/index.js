import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  const t = [1, 2, 3, 4, 5]

  const [first, second, ...rest] = t

  console.log(first, second)  // 1, 2 is printed
  console.log(rest)          // [3, 4 ,5] is printed

  const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
  }
  console.log(object1)

  const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
  }
  console.log(object2)

  const object3 = {
    name: {
      first: 'Dan',
      last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
  }
  console.log(object3)

  const fieldName = 'age' 

  object1.address = 'Helsinki'
  object1['secret number'] = 12341
  console.log(object1)

  const square = p => p * p
  console.log(square(2))
  const tSquared = t.map(p => p * p)
  console.log(tSquared)

  // function declaration
  function product(a, b) {
    return a * b
  }
  console.log(product(2, 6)) // 12

  // function expression
  const average = function(a, b) {
    return (a + b) / 2
  }
  console.log(average(2, 5)) // 3.5

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Hello name={object1.name} age={object1[fieldName]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))