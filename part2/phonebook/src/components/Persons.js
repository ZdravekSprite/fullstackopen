import React from 'react'

const Persons = ({ persons, showFilter }) => {
  const personsToShow = (showFilter === '')
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(showFilter.toUpperCase()))
    
  return (
    <div>
      {personsToShow.map((person, i) => 
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default Persons