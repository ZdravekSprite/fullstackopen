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

  const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function() {
      console.log('hello, my name is ' + this.name)
    },
    doAddition: function(a, b) {
      console.log(a + b)
    },
  }
  console.log(arto)

  arto.doAddition(1, 4)        // 5 is printed
  const referenceToAddition = arto.doAddition
  referenceToAddition(10, 15)   // 25 is printed

  arto.greet()  // "hello, my name is Arto Hellas" gets printed
  /*
  const referenceToGreet = arto.greet
  referenceToGreet() // prints "hello, my name is undefined"
  */
 // setTimeout(arto.greet, 1000)
 setTimeout(arto.greet.bind(arto), 1000)

  arto.growOlder = function() {
    this.age += 1
  }
  
  console.log(arto.age)   // 35 is printed
  arto.growOlder()
  console.log(arto.age)   // 36 is printed

  arto.address = 'Helsinki'
  arto['secret number'] = 12341
  console.log(arto)

  class Person {
    constructor(name, age) {
      this.name = name
      this.age = age
    }
    greet() {
      console.log('hello, my name is ' + this.name)
    }
  }
  
  const adam = new Person('Adam Ondra', 35)
  adam.greet()
  
  const janja = new Person('Janja Garnbret', 22)
  janja.greet()

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Hello name={arto.name} age={arto[fieldName]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))