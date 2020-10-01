import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).indexOf(newName) >= 0) {
      const person = persons.find(p => p.name === newName)
      //window.alert(`${newName} is already added to phonebook`);
      if (window.confirm(newName + ' is already sdded to phonebook, replace the old number with a new one?')) {
        personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage([`Updated ${newName}`, true])
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
        }

    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage([`Added ${newName}`, true])
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      }
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm('Delete ' + person.name + '?')) {
      personService
        .erase(id)
        .then(returnedStatus => {
          console.log('status', returnedStatus)
          setPersons(persons.filter(p => p.id !== id))
        })
      //console.log(id)
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
      <Notification message={notificationMessage} />
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
      <Persons
        persons={persons}
        showFilter={showFilter}
        deletePerson={deletePerson.bind(this)}
      />
    </div>
  )
}

export default App