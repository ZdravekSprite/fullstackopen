import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFilter, setShowFilter ] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).indexOf(newName) >= 0) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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
    //console.log(event.target.value)
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