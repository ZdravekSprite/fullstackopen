import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFilter, setShowFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).indexOf(newName) >= 0) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setShowFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        showFilter={showFilter}
        handleFilterChange={handleFilterChange.bind(this)}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson.bind(this)}
        newName={newName}
        handleNameChange={handleNameChange.bind(this)}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange.bind(this)}
      />
      <h2>Numbers</h2>
      {/* <div>debug: {newName}</div> */}
      <Persons persons={persons} showFilter={showFilter} />
    </div>
  )
}

export default App